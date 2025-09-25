const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require("readline");
const { configDotenv } = require("dotenv");
require('dotenv').config()
const dotenv = require("dotenv");

dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.API_KEY)

const invoiceDataString = `
{
  "numero_nota": "12345",
  "data_emissao": "2024-09-25",
  "itens": [
    {
      "descricao": "Refrigerante Cola",
      "quantidade": 2,
      "valor_unitario": 5.50
    },
    {
      "descricao": "Água Mineral",
      "quantidade": 1,
      "valor_unitario": 2.00
    },
    {
      "descricao": "Cigarro Marlboro",
      "quantidade": 1,
      "valor_unitario": 12.00
    }
  ]
}
`

async function runAnalysis() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


    const prompt = `Você é um analista de compras. Analise os dados da nota fiscal em JSON a seguir e verifique se há itens restritos (como cigarro ou bebidas alcoólicas). Se houver, liste esses itens.\n\nDados da Nota Fiscal:\n${invoiceDataString}\n\nResposta:`;

    // Envia o conteúdo para o modelo e aguarda a resposta
    const result = await model.generateContent(prompt);
    const response = result.response;

    console.log(response.text());
  } catch (error) {
    console.error("Erro ao se comunicar com o Gemini:", error);
  }
}

runAnalysis()