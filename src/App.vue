<template>
  <div id="app" >
    <v-app>
      <transition>
      <v-main>
        <Menu v-if="this.$router.currentRoute.name != 'Login'" />
        <router-view></router-view>
      </v-main>
    </transition>
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

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
