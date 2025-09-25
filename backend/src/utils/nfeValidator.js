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

module.exports = { validarChaveNFe };
