import mascaraDeData from "@/utils/conversor-data";

export default class cliente {
  constructor(obj) {
    obj = obj || {};
    this.id = obj.id;
    this.nome = obj.nome;
    this.cpfOuCnpj = obj.cpfOuCnpj;
    this.email = obj.email;
    this.telefone = obj.telefone;
    this.idUsuario = obj.idUsuario;
    this.dataCadastro =
      obj.dataCadastro &&
      mascaraDeData.aplicarMascaraFormatoAmericanoEmDataISO(obj.dataCadastro);
  }

  modeloValidoParaCadastro() {
    return !!this.nome;
  }

  modeloValidoParaAtualizar() {
    return !!this.nome && this.id;
  }
}
