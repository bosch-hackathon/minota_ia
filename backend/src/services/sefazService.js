const https = require('https');
const fs = require('fs');
const path = require('path');
const { buildSoapEnvelopeDistribuicao } = require('../utils/soapBuilder');


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
        rejectUnauthorized: false
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

module.exports = { fetchXmlDistribuicao };
