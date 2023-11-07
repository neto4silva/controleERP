import { createLocalVue, mount } from "@vue/test-utils";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import App from "@/App.vue";
import ControleDeClientes from "@/views/ControleDeClientes.vue";
import ControleDeProdutos from "@/views/ControleDeProdutos.vue";
import Dashboard from "@/views/Dashboard.vue";
import Venda from "@/views/Venda.vue";
import GraficosProdutos from "@/components/Graficos/GraficosProdutos.vue";

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(VueRouter);

const routes = [
  { path: "/", component: Dashboard },
  { path: "/controle-de-clientes", component: ControleDeClientes },
  { path: "/controle-de-produtos", component: ControleDeProdutos },
  { path: "/venda", component: Venda },
];

const router = new VueRouter({
  routes,
});

describe("Teste de navegação nas rotas", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("Deve navegar para a rota de Controle de Clientes", async () => {
    jest.spyOn(GraficosProdutos.methods, "criarGraficos").mockReturnValue(null);

    const wrapper = mount(App, {
      localVue,
      vuetify,
      router,
    });

    await router.push("/controle-de-clientes");
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(ControleDeClientes).exists()).toBe(true);
    jest.restoreAllMocks();
  });

  it("Deve navegar para a rota de Controle de Produtos", async () => {
    jest.spyOn(GraficosProdutos.methods, "criarGraficos").mockReturnValue(null);

    const wrapper = mount(App, {
      localVue,
      vuetify,
      router,
    });

    await router.push("/controle-de-produtos");
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(ControleDeProdutos).exists()).toBe(true);
    jest.restoreAllMocks();
  });

  it("Deve navegar para a rota de Dashboard", async () => {
    jest.spyOn(GraficosProdutos.methods, "criarGraficos").mockReturnValue(null);

    const wrapper = mount(App, {
      localVue,
      vuetify,
      router,
    });

    await router.push("/");
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(Dashboard).exists()).toBe(true);
    jest.restoreAllMocks();
  });

  it("Deve navegar para a rota de Venda", async () => {
    jest.spyOn(GraficosProdutos.methods, "criarGraficos").mockReturnValue(null);

    const wrapper = mount(App, {
      localVue,
      vuetify,
      router,
    });

    await router.push("/venda");
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(Venda).exists()).toBe(true);
    jest.restoreAllMocks();
  });
});
