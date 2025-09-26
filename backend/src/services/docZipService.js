const zlib = require('zlib');
const xml2js = require('xml2js');

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
      const obj = await xml2js.parseStringPromise(xmlExtraido, { explicitArray: false });
      resultados.push({ json: obj });
    }

    return resultados;
  } catch (err) {
    console.error("Erro ao extrair docZip:", err.message);
    return null;
  }
}

module.exports = { extractDocZip };
