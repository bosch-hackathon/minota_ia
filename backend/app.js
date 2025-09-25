// --------------------- 
// Configurações iniciais
// ---------------------
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // somente homologação

require('dotenv').config();
const express = require('express');
const fs = require('fs');
const https = require('https');
const xml2js = require('xml2js');
const cors = require('cors');
const path = require('path');
const zlib = require('zlib'); // <-- necessário para unzip

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// ---------------------
// Validação da chave NF-e (44 dígitos)
// ---------------------
function validarChaveNFe(chave) {
  if (!/^\d{44}$/.test(chave)) return false;
  const base = chave.slice(0, 43).split('').map(d => parseInt(d, 10));
  let peso = 2, soma = 0;
  for (let i = base.length - 1; i >= 0; i--) {
    soma += base[i] * peso;
    peso = peso === 9 ? 2 : peso + 1;
  }
  const dv = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
  return dv === Number(chave[43]);
}

// ---------------------
// Monta distDFeInt (XML interno) - com cUFAutor = 32 (ES)
// ---------------------
function buildDistDFeInt(chave, cnpjDest, tpAmb = '1', cUFAutor = '35') {
  return (
    `<distDFeInt xmlns="http://www.portalfiscal.inf.br/nfe" versao="1.01">` +
      `<tpAmb>${tpAmb}</tpAmb>` +
      `<cUFAutor>${cUFAutor}</cUFAutor>` +
      `<CNPJ>${cnpjDest}</CNPJ>` +
      `<consChNFe>` +
        `<chNFe>${chave}</chNFe>` +
      `</consChNFe>` +
    `</distDFeInt>`
  );
}

// ---------------------
// Monta envelope SOAP NFeDistribuicaoDFe
// ---------------------
function buildSoapEnvelopeDistribuicao(chave, cnpjDest, tpAmb = '1', cUFAutor = '35') {
  const distDFe = buildDistDFeInt(chave, cnpjDest, tpAmb, cUFAutor);

  return (
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">` +
      `<soap12:Body>` +
        `<nfeDistDFeInteresse xmlns="http://www.portalfiscal.inf.br/nfe/wsdl/NFeDistribuicaoDFe">` +
          `<nfeDadosMsg xmlns="http://www.portalfiscal.inf.br/nfe/wsdl/NFeDistribuicaoDFe">` +
            distDFe +
          `</nfeDadosMsg>` +
        `</nfeDistDFeInteresse>` +
      `</soap12:Body>` +
    `</soap12:Envelope>`
  );
}

// ---------------------
// Consulta SEFAZ Distribuicao (NFeDistribuicaoDFe)
// ---------------------
async function fetchXmlDistribuicao(chave, cnpjDest) {
  return new Promise((resolve, reject) => {
    try {
      const url = 'https://www1.nfe.fazenda.gov.br/NFeDistribuicaoDFe/NFeDistribuicaoDFe.asmx';
      const parsed = new URL(url);

      const certPath = process.env.CERT_PATH || path.resolve('./certificadosLucidio.pfx');
      const certPass = process.env.CERT_PASS;

      if (!fs.existsSync(certPath)) throw new Error(`Certificado não encontrado: ${certPath}`);
      if (!certPass) throw new Error('CERT_PASS não configurada no .env');

      const pfxBuffer = fs.readFileSync(certPath);
      const agent = new https.Agent({
        pfx: pfxBuffer,
        passphrase: certPass,
        rejectUnauthorized: false // homologação
      });

      const tpAmb = process.env.TP_AMB || '1';
      const soapEnvelope = buildSoapEnvelopeDistribuicao(chave, cnpjDest, tpAmb);

      const headers = {
        'Content-Type': 'application/soap+xml; charset=utf-8',
        'Content-Length': Buffer.byteLength(soapEnvelope, 'utf8'),
        'SOAPAction': 'http://www.portalfiscal.inf.br/nfe/wsdl/NFeDistribuicaoDFe/nfeDistDFeInteresse'
      };

      const req = https.request(
        {
          hostname: parsed.hostname,
          port: 443,
          path: parsed.pathname,
          method: 'POST',
          headers,
          agent,
          timeout: 30000
        },
        res => {
          let data = '';
          res.on('data', chunk => (data += chunk));
          res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(data);
            } else {
              reject(new Error(`SEFAZ retornou ${res.statusCode}: ${data.substring(0, 500)}`));
            }
          });
        }
      );

      req.on('error', reject);
      req.on('timeout', () => req.destroy(new Error('timeout')));
      req.write(soapEnvelope);
      req.end();
    } catch (e) {
      reject(e);
    }
  });
}

// ---------------------
// Função para extrair e decodificar docZip -> JSON
// ---------------------
async function extractDocZip(parsedSoap) {
  try {
    const retDist = parsedSoap?.['soap:Envelope']?.['soap:Body']?.nfeDistDFeInteresseResponse?.nfeDistDFeInteresseResult?.retDistDFeInt;

    const lote = retDist?.loteDistDFeInt;
    if (!lote || !lote.docZip) return null;

    const docs = Array.isArray(lote.docZip) ? lote.docZip : [lote.docZip];

    const resultados = [];
    for (const d of docs) {
      const conteudo = d._;
      const zipped = Buffer.from(conteudo, "base64");
      const xmlExtraido = zlib.gunzipSync(zipped).toString("utf-8");

      // parse do XML extraído
      const obj = await xml2js.parseStringPromise(xmlExtraido, { explicitArray: false });

      resultados.push({ 

        json: obj 
      });
    }

    return resultados;
  } catch (err) {
    console.error("Erro ao extrair docZip:", err.message);
    return null;
  }
}

// ---------------------
// Rota principal /consulta
// ---------------------
app.post('/consulta', async (req, res) => {
  try {
    const { chave } = req.body;
    if (!chave) return res.status(400).json({ error: 'Chave não informada' });
    if (!validarChaveNFe(chave)) return res.status(400).json({ error: 'Chave inválida' });

    const cnpjDest = process.env.CNPJ;
    if (!cnpjDest) return res.status(400).json({ error: 'CNPJ não configurado no .env' });

    const rawXml = await fetchXmlDistribuicao(chave, cnpjDest);

    let parsed = null;
    try {
      parsed = await xml2js.parseStringPromise(rawXml, { explicitArray: false });
    } catch (e) {
      console.log('[WARN] Falha ao parsear XML SOAP:', e.message);
    }

    // pega o conteúdo do docZip e transforma em objeto
    const docZipInfos = await extractDocZip(parsed);

    // ---- LOG no servidor ----
    console.log("==== JSON extraído do docZip ====");
    console.dir(docZipInfos, { depth: null });

    // ---- Retorno para o front ----
    res.json({ 
      chave, 
      cnpj: cnpjDest, 
      jsonExportado: docZipInfos // <--- aqui já está pronto para enviar pro Gemini
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------------
// Health check
// ---------------------
app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
