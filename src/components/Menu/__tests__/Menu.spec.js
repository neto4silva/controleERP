import { createLocalVue, mount } from "@vue/test-utils";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import Menu from "@/components/Menu/Menu.vue";

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(VueRouter);

const router = new VueRouter({
  routes: [
  ],
});

describe("Componente de Menu", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("deve abrir e fechar o drawer ao clicar no botão de menu", async () => {
    const wrapper = mount(Menu, {
      localVue,
      vuetify,
      router,
    });

    expect(wrapper.vm.drawer).toBe(false);

    const botaoMenu = wrapper.find(".nav-icon");
    await botaoMenu.trigger("click");

    expect(wrapper.vm.drawer).toBe(true);

    await botaoMenu.trigger("click");

    expect(wrapper.vm.drawer).toBe(false);
  });

  it("deve abrir o menu de notificações ao clicar no ícone de notificações", async () => {
    const wrapper = mount(Menu, {
      localVue,
      vuetify,
      router,
    });

    expect(wrapper.vm.notificationsMenu).toBe(false);

    const iconeNotificacoes = wrapper.find(".v-badge");
    await iconeNotificacoes.trigger("click");

    expect(wrapper.vm.notificationsMenu).toBe(true);
  });
});
