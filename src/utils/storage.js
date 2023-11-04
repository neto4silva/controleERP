import Usuario from "@/models/usuario-model";

function salvarUsuarioNaStorage(usuario) {
  let usuarioStrig = JSON.stringify(usuario);
  localStorage.setItem("usuario", usuarioStrig);
}

function obterUsuarioNaStorage() {
  let usuarioStrig = localStorage.getItem("usuario");
  return new Usuario(JSON.parse(usuarioStrig));
}

function salvarTokenNaStorage(token) {
  localStorage.setItem("token", token);
}

function obterTokenNaStorage() {
  return localStorage.getItem("token");
}

function removerTokenNaStorage() {
  localStorage.removeItem('token');
}

function removerUsuarioNaStorage() {
  localStorage.removeItem('usuario');
}

export default {
  removerUsuarioNaStorage,
  salvarUsuarioNaStorage,
  obterUsuarioNaStorage,
  removerTokenNaStorage,
  salvarTokenNaStorage,
  obterTokenNaStorage,
};
