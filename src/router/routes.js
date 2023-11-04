import Dashboard from "@/views/Dashboard";
import ControleDeClientes from "@/views/ControleDeClientes";
import Login from "@/views/Login";
import ControleDeProdutos from "@/views/ControleDeProdutos";
import ConfiguracoesUsuario from "@/views/ConfiguracoesUsuario";
import RelatoriosClientes from "@/views/RelatoriosClientes";
import RelatoriosProdutos from "@/views/RelatoriosProdutos";
import Clientes from "@/views/Clientes";
import Produtos from "@/views/Produtos";
import Venda from "@/views/Venda";

const routes = [
  {
    path: "/",
    name: "home",
    component: Dashboard,
    meta: {requiredAuth: true }
  },
  {
    path: "/controle-de-clientes",
    name: "ControleDeClientes",
    component: ControleDeClientes,
    meta: {requiredAuth: true }
  },
  {
    path: "/controle-de-produtos",
    name: "ControleDeProdutos",
    component: ControleDeProdutos,
    meta: { requiredAuth: true }
  },  
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {requiredAuth: false }
  },
  {
    path: "/configuracoes-usuario",
    name: "ConfiguracoesUsuario",
    component: ConfiguracoesUsuario,
    meta: {requiredAuth: true }
  },
  {
    path: "/relatorios-clientes",
    name: "Relatorios Clientes",
    component: RelatoriosClientes,
    meta: {requiredAuth: true }
  },
  {
    path: "/relatorios-Produtos",
    name: "Relatorios",
    component: RelatoriosProdutos,
    meta: {requiredAuth: true }
  },
  {
    path: "/clientes",
    name: "Clientes",
    component: Clientes,
    meta: {requiredAuth: true }
  },
  {
    path: "/produtos",
    name: "Produtos",
    component: Produtos,
    meta: {requiredAuth: true }
  },
  {
    path: "/venda",
    name: "Venda",
    component: Venda,
    meta: {requiredAuth: true }
  },
];

export default routes
