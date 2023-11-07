import { createLocalVue, mount } from "@vue/test-utils";
import Input from "@/components/Input/Input.vue";

const localVue = createLocalVue();

describe("Input", () => {
  it("deve renderizar um campo de texto corretamente", () => {
    const wrapper = mount(Input, {
      localVue,
      propsData: {
        label: "Nome",
        type: "text",
        value: "John",
      },
    });

    expect(wrapper.find("input").element.value).toBe("John");
    expect(wrapper.find("label").text()).toBe("Nome");
  });

  it("deve emitir um evento ao digitar", async () => {
    const wrapper = mount(Input, {
      localVue,
      propsData: {
        label: "E-mail",
        type: "email",
        value: "",
      },
    });

    await wrapper.setData({ valor: "john@example.com" });

    expect(wrapper.emitted("onChange")).toBeTruthy();
    expect(wrapper.emitted("onChange")[0]).toEqual(["john@example.com"]);
  });
});
