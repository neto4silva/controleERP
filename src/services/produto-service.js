import api from './api';

function obterTodos() {
  return api.get('/produtos');
}

function obterPorId(id) {
  return api.get(`/produtos/${id}`);
}

function cadastrar(produto) {
  return api.post('/produtos', produto);
}

function atualizar(produto) {
  return api.put(`/produtos/${produto.id}`, produto);
}

function deletar(id) {
  return api.delete(`/produtos/${id}`);
}

function obterProdutosComMaiorEstoque() {
  return api.get("/produtos/com-maior-estoque");
}

export default {
  obterTodos,
  obterPorId,
  cadastrar,
  atualizar,
  deletar,
  obterProdutosComMaiorEstoque,
};
