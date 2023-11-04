<template>
  <v-app>
    <v-main>
      <Menu v-if="this.$router.currentRoute.name != 'Login'"/>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Menu from '../src/components/Menu.vue'

export default {
  name: 'App',
  components: {
    Menu,
  }
};
</script>

<style>

body {
  font-family: 'Courier New', Courier, monospace;
}

</style>
