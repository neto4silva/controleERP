<template>
  <div id="app" >
    <v-app>
      <transition>
      <v-main>
        <Menu v-if="this.$router.currentRoute.name != 'Login'" />
        <router-view></router-view>
        <FooterLogin v-if="this.$router.currentRoute.name === 'Login'"/>
      </v-main >
    </transition>
    </v-app>
  </div>
</template>

<script>
import Menu from "./components/Menu/Menu.vue";
import FooterLogin from '@/components/Footer/FooterLogin.vue';

export default {
  name: "App",
  components: {
    Menu,
    FooterLogin
  },
};
</script>

<style>

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
