import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import ControleDeProdutos from "@/views/ControleDeProdutos.vue";

const localVue = createLocalVue();
localVue.use(Vuetify);

describe("ControleDeProdutos", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("deve renderizar o componente corretamente", () => {
    const wrapper = shallowMount(ControleDeProdutos, {
      localVue,
      vuetify,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('deve abrir o modal de adição ao clicar no botão "Adicionar"', async () => {
    const wrapper = shallowMount(ControleDeProdutos, {
      localVue,
      vuetify,
    });
    await wrapper.vm.abrirModalAdicao();
    expect(wrapper.vm.modalAberto).toBe(true);
    expect(wrapper.vm.edicao).toBe(false);
  });

  it("deve abrir o modal de edição ao clicar em uma linha da tabela", async () => {
    const wrapper = shallowMount(ControleDeProdutos, {
      localVue,
      vuetify,
    });
    const produto = {
      id: 1,
      nome: "Produto 1",
      valor: 10.0,
      quantidadeEstoque: 5,
      observacao: "Produto Original",
      dataCadastro: new Date().toISOString().split("T")[0],
    };
    await wrapper.vm.abrirModalEdicao(produto);
    expect(wrapper.vm.modalAberto).toBe(true);
    expect(wrapper.vm.edicao).toBe(true);
    expect(wrapper.vm.Produto).toEqual(produto);
  });
});
