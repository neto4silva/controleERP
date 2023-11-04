import api from "./api";

function login(email, senha) {
  return api.post(`/login`, { email, senha });
}

function logout() {
  return api.delete(`/logout`);
}

function obterTodos() {
  return api.get(`/usuarios`);
}

function obterTodosPorId(id) {
  return api.get(`/usuarios${id}`);
}

export default {
  login,
  logout,
  obterTodos,
  obterTodosPorId,
};
