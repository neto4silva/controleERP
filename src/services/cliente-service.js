import axios from 'axios';

function obterTodos() {
  return axios.get('http://192.168.1.6:3400/clientes');
}

function obterPorId(id) {
  return axios.get(`http://192.168.1.6:3400/clientes/${id}`);
}

function cadastrar(cliente) {
  return axios.post('http://192.168.1.6:3400/clientes', cliente);
}

function atualizar(cliente) {
  return axios.put(`http://192.168.1.6:3400/clientes/${cliente.id}`, cliente);
}

function deletar(id) {
  return axios.delete(`http://192.168.1.6:3400/clientes/${id}`);
}

export default {
  obterTodos,
  obterPorId,
  cadastrar,
  atualizar,
  deletar
};
