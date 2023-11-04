import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import { mount, createLocalVue } from "@vue/test-utils";
import GraficosProdutos from "@/components/GraficosProdutos.vue";

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("GraficosProdutos.vue", () => {
  it("deve renderizar o componente", () => {
    const vuetify = new Vuetify();

    const router = new VueRouter();

    const wrapper = mount(GraficosProdutos, {
      localVue,
      vuetify,
      router,
    });

    expect(wrapper.exists()).toBe(true);
  });
});
