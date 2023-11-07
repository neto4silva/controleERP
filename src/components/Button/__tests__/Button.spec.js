import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import ButtonComponent from "@/components/Button/Button.vue";

const localVue = createLocalVue();
localVue.use(Vuetify);

describe("ButtonComponent", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("Deve renderizar o botão corretamente", () => {
    const wrapper = shallowMount(ButtonComponent, {
      localVue,
      vuetify,
      propsData: {
        value: "Meu Botão",
      },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toBe("Meu Botão");
  });

  it("Deve aplicar a cor e o estilo 'dark' corretamente", () => {
    const wrapper = shallowMount(ButtonComponent, {
      localVue,
      vuetify,
      propsData: {
        value: "Meu Botão",
      },
    });

    // Verifique a cor e o estilo do botão
    expect(wrapper.find(".button").attributes("color")).toBe("#2D4F6C");
    expect(wrapper.find(".button").attributes("dark")).toBe("true");
  });
});