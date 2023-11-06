<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-img
        height="140"
        class="pa-4"
        src="https://media.istockphoto.com/id/1283467210/pt/vetorial/light-blue-coloured-checkered-grunge-vector-backgrounds-with-narrow-or-fine-checks.jpg?s=612x612&w=0&k=20&c=XeQYpKHYxltIrMsRfxKdJIoY6tvesgqiK0qAUqsil_g="
      >
        <div class="text-center">
          <v-avatar class="mb-4" color="grey darken-1" size="64">
            <v-img
              aspect-ratio="30"
              src="https://img.freepik.com/vetores-premium/perfil-de-avatar-de-homem-no-icone-redondo_24640-14044.jpg"
            />
          </v-avatar>
          <h2>Meu Perfil</h2>
        </div>
      </v-img>
      <v-divider></v-divider>
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

    <v-app-bar app elevate-on-scroll elevation="3" color="white">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <!-- notificações -->
      <v-menu offset-y>
        <template v-slot:activator="{ attrs, on }">
          <span class="mx-5 mr-10" style="cursor: pointer" v-bind="attrs" v-on="on" @click="openNotificationsMenu">
            <v-badge content="3" color="red" offset-y="10" offset-x="10">
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </span>
        </template>
        <v-list three-line width="250">
          <template v-for="(item, index) in items">
            <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>
            <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>
            <v-list-item v-else :key="item.title">
              <v-list-item-avatar>
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>

      <!-- perfil -->
      <v-menu offset-y>
        <template v-slot:activator="{ attrs, on }">
          <span style="cursor: pointer" v-bind="attrs" v-on="on">
            <v-chip link>
              <v-badge dot bottom color="green" offset-y="10" offset-x="10">
                <v-avatar size="40">
                  <v-img src="https://img.freepik.com/vetores-premium/perfil-de-avatar-de-homem-no-icone-redondo_24640-14044.jpg"/>
                </v-avatar>
              </v-badge>
              <span class="ml-3">Meu Perfil</span>
            </v-chip>
          </span>
        </template>
        <v-list width="250" class="py-0">
          <v-list-item two-line>
            <v-list-item-avatar>
              <img src="https://img.freepik.com/vetores-premium/perfil-de-avatar-de-homem-no-icone-redondo_24640-14044.jpg"/>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Meu Perfil</v-list-item-title>
              <v-list-item-subtitle>Online</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
          <v-list-item v-for="(menu, i) in menus" :key="i">
            <v-list-item-icon>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ menu.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "TopBar",
  data() {
    return {
      drawer: false,
      menus: [
        { title: "Perfil", icon: "mdi-account" },
        { title: "Alterar Senha", icon: "mdi-key" },
        { title: "Configurações", icon: "mdi-cog" },
        { title: "Sair", icon: "mdi-logout" },
      ],
      items: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Brunch this weekend?",
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Oui oui",
          subtitle:
            '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          title: "Birthday gift",
          subtitle:
            '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          title: "Recipe to try",
          subtitle:
            '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
      isDesktop: false,
      notificationsMenu: false,
      profileMenu: false,
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
      this.drawer = !this.drawer;
    },
    logout() {
      Swal.fire({
        title: "Sair do sistema",
        text: "Tem certeza de que deseja sair do sistema?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sair",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.modoDark = false;
          this.$router.push("/login");
        }
      });
    },
    openNotificationsMenu() {
      this.notificationsMenu = !this.notificationsMenu;
    },
    openProfileMenu() {
      this.profileMenu = !this.profileMenu;
    },
  },
  created() {
    this.isDesktop = window.innerWidth >= 768;
    window.addEventListener("resize", () => {
      this.isDesktop = window.innerWidth >= 768;
    });
  },
};
</script>

<style scoped>
/* Seus estilos aqui */
</style>
