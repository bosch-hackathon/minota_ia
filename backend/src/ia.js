require('dotenv').config();
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('AIzaSyA3TwUQf59heFcdtcsUeWEXPBP_29HrBY4');

// lê o JSON exportado da nota fiscal (criado pelo seu backend)
const docZipInfos = JSON.parse(fs.readFileSync('./saida.json', 'utf-8'));

// transforma o JSON em string para enviar ao Gemini
const invoiceDataString = JSON.stringify(docZipInfos, null, 2);

async function runAnalysis() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Você é um analista de compras. Analise os dados da nota fiscal em JSON a seguir e verifique se há itens restritos (como cigarro ou bebidas alcoólicas). Se houver, liste esses itens.\n\nDados da Nota Fiscal:\n${invoiceDataString}\n\nResposta:`;

    const result = await model.generateContent(prompt);
    const response = result.response;

    console.log("==== Resposta do Gemini ====");
    console.log(response.text());
  } catch (error) {
    console.error("Erro ao se comunicar com o Gemini:", error);
  }
}

runAnalysis();
