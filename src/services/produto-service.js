import axios from 'axios';

function obterTodos() {
  return axios.get('http://192.168.1.6:3400/produtos');
}

function obterPorId(id) {
  return axios.get(`http://192.168.1.6:3400/produtos/${id}`);
}

function cadastrar(produto) {
  return axios.post('http://192.168.1.6:3400/produtos', produto);
}

function atualizar(produto) {
  return axios.put(`http://192.168.1.6:3400/produtos/${produto.id}`, produto);
}

function deletar(id) {
  return axios.delete(`http://192.168.1.6:3400/produtos/${id}`);
}

function obterProdutosComMaiorEstoque() {
  return axios.get("http://192.168.1.6:3400/produtos/com-maior-estoque");
}

export default {
  obterTodos,
  obterPorId,
  cadastrar,
  atualizar,
  deletar,
  obterProdutosComMaiorEstoque,
};
