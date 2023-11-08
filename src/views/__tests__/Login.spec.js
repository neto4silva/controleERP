import { mount, createLocalVue } from "@vue/test-utils";
import LoginPrincipal from "@/views/Login.vue";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("LoginPrincipal", () => {
  let wrapper;
  let router;

  beforeEach(() => {
    router = new VueRouter(); // Crie uma instância do Vue Router
    wrapper = mount(LoginPrincipal, {
      localVue,
      router, // Passe a instância do Vue Router
    });
  });

  it("renderiza o componente", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("chama o método de login quando o formulário é enviado", async () => {
    const loginSpy = jest.spyOn(wrapper.vm, "login");

    await wrapper.find("form").trigger("submit.prevent");

    expect(loginSpy).toHaveBeenCalled();
  });

  it("realiza o login e redireciona em caso de login bem-sucedido", async () => {
    const loginSpy = jest.spyOn(wrapper.vm, "login").mockImplementation(() => {
      // Simula um login bem-sucedido
      wrapper.vm.usuario.email = "test@example.com";
      wrapper.vm.usuario.senha = "password123";
    });
    const usuarioServiceMock = {
      login: jest.fn().mockResolvedValue({
        data: {
          usuario: { email: "test@example.com" },
          token: "token123",
        },
      }),
    };
    wrapper.setData({ usuarioService: usuarioServiceMock });

    await wrapper.find("form").trigger("submit.prevent");

    expect(loginSpy).toHaveBeenCalled();
    expect(wrapper.vm.usuario.email).toBe("test@example.com");
    expect(wrapper.vm.usuario.senha).toBe("password123");
    expect(wrapper.vm.$route.path).toBe("/");
  });
});
