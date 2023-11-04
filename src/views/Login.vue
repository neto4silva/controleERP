<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12 dimensao">
          <v-card-text class="border-blue">
            <div class="text-center">
              <img src="@/assets/logo.png" alt="Logo da Empresa" width="300" />
              {{ usuario.email }}
            </div>
            <v-form @submit.prevent="login">
              <v-layout column>
                <Input label="Email" v-model="usuario.email"/>
                <Input label="Senha" type="password" v-model="usuario.senha"/>
                <v-flex xs12>
                  <Button class="btn" value="Entrar" :callback="login"></Button>
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
import Button from "../components/Button.vue";
import Input from "../components/Input.vue";

export default {
  name: "Log-in",
  components: {
    Button,
    Input,
  },
  data () {
    return {
      usuario: {
        email: '',
        senha: ''
      }
    };
  },
  methods: {
    login() {
      if (this.email === "senhas" && this.password === "senhas") {
        this.$router.push("/");
      } else {
        this.$sawl.fire({
          icon: "error",
          title: "Credenciais inválidas",
          text: "Tente novamente.",
        });
      }
    },
  },
};
</script>

<style scoped>
.border-blue {
  border: 1px solid #2d4f6c;
  border-top: 3px solid #2d4f6c;
  padding: 20px;
}

.dimensao {
  width: 500px;
}

.btn {
  width: 100%;
}
</style>
