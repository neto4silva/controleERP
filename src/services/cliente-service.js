import api from "./api";

function obterTodos() {
  return api.get("/clientes");
}

function obterPorId(id) {
  return api.get(`/clientes/${id}`);
}

function cadastrar(cliente) {
  return api.post("/clientes", cliente);
}

function atualizar(cliente) {
  return api.put(`/clientes/${cliente.id}`, cliente);
}

function deletar(id) {
  return api.delete(`/clientes/${id}`);
}

export default {
  obterTodos,
  obterPorId,
  cadastrar,
  atualizar,
  deletar,
};
