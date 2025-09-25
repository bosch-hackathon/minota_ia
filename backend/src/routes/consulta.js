const express = require('express');
const router = express.Router();
const fs = require('fs'); // adiciona fs para salvar arquivo
const { validarChaveNFe } = require('../utils/nfeValidator');
const { fetchXmlDistribuicao } = require('../services/sefazService');
const { extractDocZip } = require('../services/docZipService');
const xml2js = require('xml2js');

router.post('/', async (req, res) => {
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

    const docZipInfos = await extractDocZip(parsed);

    console.log("==== JSON extraído do docZip ====");
    console.dir(docZipInfos, { depth: null });

    // -------------------------------
    // Salva o JSON em arquivo para o ia.js
    // -------------------------------
    fs.writeFileSync(
      './saida.json',                  // arquivo será criado na raiz do projeto
      JSON.stringify(docZipInfos, null, 2), 
      'utf-8'
    );
    console.log('[INFO] JSON exportado salvo em saida.json');

    res.json({ chave, cnpj: cnpjDest, jsonExportado: docZipInfos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
