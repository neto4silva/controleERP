function aplicarMascaraParaReal(valor){
  if(isNaN(valor)){
    return 0;
  }
  return Number(valor).toLocaleString('pt-BR', {minimumFractionDigits: 2});
}

function aplicarMascaraParaRealcomPrefixo(valor){
  if(isNaN(valor)){
    return 0;
  }
  return Number(valor).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
}

export default {
  aplicarMascaraParaReal,
  aplicarMascaraParaRealcomPrefixo
}