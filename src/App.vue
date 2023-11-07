<template>
  <div id="app">
    <v-app>
      <v-main>
        <Menu v-if="this.$router.currentRoute.name != 'Login'" />
        <router-view></router-view>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Menu from "./components/Menu/Menu.vue";

export default {
  name: "App",
  components: {
    Menu,
  },
};
</script>

<style>
</style>
