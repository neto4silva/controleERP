<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md3>
        <v-card class="elevation-12">
          <v-card-text class="border-blue">
            <div class="text-center">
              <img src="@/assets/logo.gif" alt="Logo da Empresa" width="300" />
            </div>
            <v-form @submit.prevent="login">
              <v-layout column>
                <Input
                  label="Email"
                  v-model="usuario.email"
                  ref="emailField"
                  @enter="login"
                />
                <Input
                  label="Senha"
                  type="password"
                  v-model="usuario.senha"
                  ref="passwordField"
                  @enter="login"
                />
                <v-flex xs12>
                  <Button
                    class="btn mb-16"
                    value="Entrar"
                    :callback="login"
                  ></Button>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Button from "@/components/Button/Button.vue";
import Input from "../components/Input/Input.vue";
import Usuario from "../models/usuario-model";
import usuarioService from "../services/usuario-service";
import Swal from "sweetalert2";
import utilsStore from "@/utils/storage";

export default {
  name: "LoginPrincipal",
  components: {
    Button,
    Input,
  },
  data() {
    return {
      usuario: new Usuario(),
      usuarioService: usuarioService,
    };
  },
  methods: {
    login() {
      if (!this.usuario.modeloValidoLogin()) {
        Swal.fire({
          icon: "warning",
          title: "Os campos de Email e Senha são obrigatórios!",
          confirmButtonColor: "#2D4F6C",
        });
        return;
      }
      usuarioService
        .login(this.usuario.email, this.usuario.senha)
        .then((response) => {
          this.usuario = new Usuario(response.data.usuario);
          utilsStore.salvarUsuarioNaStorage(this.usuario);
          utilsStore.salvarTokenNaStorage(response.data.token);
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Credenciais inválidas",
            text: "Tente novamente.",
          });
        });
    },
  },
};
</script>

<style scoped>
.border-blue {
  border-top: 3px solid #2d4f6c;
  padding: 20px;
}

.btn {
  width: 100%;
}
</style>
