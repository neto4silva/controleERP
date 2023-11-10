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
    name: "Dashboard",
    component: Dashboard,
    title: "Dashboard",
    meta: { requiresAuth: true },
  },
  {
    path: "/controle-de-clientes",
    name: "ControleDeClientes",
    component: ControleDeClientes,
    title: "Clientes",
    meta: { requiresAuth: true },
  },
  {
    path: "/controle-de-produtos",
    name: "ControleDeProdutos",
    component: ControleDeProdutos,
    title: "Produtos",
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    title: "Login",
    meta: { requiresAuth: false },
  },
  {
    path: "/configuracoes-usuario",
    name: "ConfiguracoesUsuario",
    component: ConfiguracoesUsuario,
    title: "Usuarios",
    meta: { requiresAuth: true },
  },
  {
    path: "/relatorios-clientes",
    name: "Relatorios Clientes",
    component: RelatoriosClientes,
    title: "Clientes",
    meta: { requiresAuth: true },
  },
  {
    path: "/relatorios-Produtos",
    name: "Relatorios",
    component: RelatoriosProdutos,
    title: "Produtos",
    meta: { requiresAuth: true },
  },
  {
    path: "/clientes",
    name: "Clientes",
    component: Clientes,
    title: "Clientes",
    meta: { requiresAuth: true },
  },
  {
    path: "/produtos",
    name: "Produtos",
    component: Produtos,
    title: "Clientes",
    meta: { requiresAuth: true },
  },
  {
    path: "/venda",
    name: "Venda",
    component: Venda,
    title: "Venda",
    meta: { requiresAuth: true },
  },
];

export default routes;
