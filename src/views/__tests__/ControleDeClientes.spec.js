import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import ControleDeClientes from "@/views/ControleDeClientes.vue";

const localVue = createLocalVue();
localVue.use(Vuetify);

describe("ControleDeClientes", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("Deve renderizar o componente corretamente", () => {
    const wrapper = shallowMount(ControleDeClientes, {
      localVue,
      vuetify,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('Deve abrir o modal de adição ao clicar no botão "Adicionar"', async () => {
    const wrapper = shallowMount(ControleDeClientes, {
      localVue,
      vuetify,
    });
    await wrapper.vm.abrirModalAdicao();
    expect(wrapper.vm.modalAberto).toBe(true);
    expect(wrapper.vm.edicao).toBe(false);
  });

  it("Deve abrir o modal de edição ao clicar em uma linha da tabela", async () => {
    const wrapper = shallowMount(ControleDeClientes, {
      localVue,
      vuetify,
    });
    const cliente = { id: 1, nome: "Cliente 1", cpfOuCnpj: "123456789" };
    await wrapper.vm.abrirModalEdicao(cliente);
    expect(wrapper.vm.modalAberto).toBe(true);
    expect(wrapper.vm.edicao).toBe(true);
    expect(wrapper.vm.cliente).toEqual(cliente);
  });
});
