<template>
  <div>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="openDrawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Controle ERP</v-app-bar-title>
      <v-menu v-model="profileMenu" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text icon v-bind="attrs" v-on="on" class="ml-5">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
          <v-btn icon class="ml-auto">
            <span class="badge">0</span>
            <v-icon>mdi-bell</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="$router.push('/configuracoes-usuario')">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Meu perfil</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>
          <v-list-item @click="toggleDarkMode">
            <v-list-item-icon>
              <v-icon>mdi-theme-light-dark</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Modo Escuro</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list>
        <v-subheader>Menu</v-subheader>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item to="/controle-de-clientes">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Clientes</v-list-item-title>
        </v-list-item>
        <v-list-item to="/controle-de-produtos">
          <v-list-item-icon>
            <v-icon>mdi-format-list-bulleted</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Produtos</v-list-item-title>
        </v-list-item>
        <v-list-item to="/venda">
          <v-list-item-icon>
            <v-icon>mdi-store</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Venda</v-list-item-title>
        </v-list-item>
        <v-subheader>Relatórios</v-subheader>
        <v-list dense>
          <v-list-item link to="/relatorios-clientes">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Relatórios de Clientes</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/relatorios-produtos">
            <v-list-item-icon>
              <v-icon>mdi-package-variant-closed</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Relatórios de Produtos</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "MenuView",
  data() {
    return {
      drawer: false,
      profileMenu: false,
      relatoriosMenu: false, // Adicionado
    };
  },
  computed: {
    modoDark: {
      get() {
        return this.$vuetify.theme.dark;
      },
      set(value) {
        this.$vuetify.theme.dark = value;
      },
    },
  },
  methods: {
    toggleDarkMode() {
      this.modoDark = !this.modoDark;
    },
    openDrawer() {
      this.drawer = true;
    },
    openProfileMenu() {
      this.profileMenu = !this.profileMenu;
    },
    logout() {
      this.modoDark = false;
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.profile-button {
  position: relative;
  display: inline-block;
}

.badge {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 4px 8px;
  position: absolute;
  top: -8px;
  right: -8px;
}
</style>
