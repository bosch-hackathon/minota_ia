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

module.exports = { buildDistDFeInt, buildSoapEnvelopeDistribuicao };
