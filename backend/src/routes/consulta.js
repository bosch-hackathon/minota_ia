const express = require('express');
const router = express.Router();
const fs = require('fs');
const { validarChaveNFe } = require('../utils/nfeValidator');
const { fetchXmlDistribuicao } = require('../services/sefazService');
const { extractDocZip } = require('../services/docZipService');
const xml2js = require('xml2js');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

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

    // salva JSON (continua útil para debug, se quiser)
    fs.writeFileSync(
      './saida.json',
      JSON.stringify(docZipInfos, null, 2),
      'utf-8'
    );
    console.log('[INFO] JSON exportado salvo em saida.json');

    // -------------------------------
    // 🔥 Integração com o Gemini
    // -------------------------------
    const invoiceDataString = JSON.stringify(docZipInfos, null, 2);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `Você é um analista de compras feitas com cartão corporativo que analisa segundo a política de uma empresa genérica no Brasil. 
Analise os dados da nota fiscal em JSON a seguir, descreva os produtos contidos e verifique se há itens restritos (como cigarro ou bebidas alcoólicas) seja conciso e direto e ao final dê um veredito se a nota é classificada como suspeita ou aprovada. 
Se houver, liste esses itens.

Dados da Nota Fiscal:
${invoiceDataString}

Resposta:`;

    const result = await model.generateContent(prompt);
    const respostaGemini = result.response.text();

    // 🔥 devolve a análise para o frontend
    res.json({
      chave,
      cnpj: cnpjDest,
      resultadoGemini: respostaGemini
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
