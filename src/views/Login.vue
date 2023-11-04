<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-card-text class="border-blue">
            <div class="text-center">
              <img src="@/assets/logo.png" alt="Logo da Empresa" width="200" />
            </div>
            <v-form @submit.prevent="login">
              <v-layout column>
                <v-flex xs12>
                  <v-text-field
                    v-model="email"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="password"
                    label="Senha"
                    type="password"
                    required
                    @keyup.enter="login"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <Button value="Entrar" :callback="login"></Button>
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

export default {
  name: "Log-in",
  components: {
    Button,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (this.email === "senhas" && this.password === "senhas") {
        this.$router.push("/");
      } else {
        this.$vuetify.snackbar.error("Credenciais inválidas. Tente novamente.");
      }
    },
  },
};
</script>

<style>
.border-blue {
  border: 1px solid #2d4f6c;
  border-top: 3px solid #2d4f6c;
  padding: 20px;
}
</style>
