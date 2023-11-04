<template>
  <v-container>
    <div>
      <div class="text-center mb-4">
        <div class="d-inline-block align-middle">
          <v-avatar size="150">
            <v-img src="@/assets/avatar.png"></v-img>
          </v-avatar>
        </div>
      </div>

      <v-divider class="my-4"></v-divider>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-icon>mdi-account</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Nome de Usuário</v-list-item-title>
              <v-list-item-subtitle>Nome do usuário atual</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn text @click="editarNome">Editar</v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-list-item>
            <v-list-item-avatar>
              <v-icon>mdi-email</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>E-mail</v-list-item-title>
              <v-list-item-subtitle>E-mail atual</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn text @click="editarEmail">Editar</v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-list-item>
            <v-list-item-avatar>
              <v-icon>mdi-lock</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Senha</v-list-item-title>
              <v-list-item-subtitle>********</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn text @click="editarSenha">Editar</v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
  </v-container>
</template>

<script>

export default {
  name: "ConfiguracoesUsuario",
  methods: {
    editarNome() {
      // Adicione a lógica para editar o nome do usuário aqui
    },
    editarEmail() {
      // Adicione a lógica para editar o e-mail do usuário aqui
    },
    editarSenha() {
      // Adicione a lógica para editar a senha do usuário aqui
    },
  },
};
</script>
