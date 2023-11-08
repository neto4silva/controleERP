<template>
  <v-footer app>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6">
        <div class="text-center text-sm-left">
          <span>Versão 0.1.0 &copy; {{ currentYear }} NetoWorks LTDA</span>
        </div>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="text-center text-sm-right">
          <img src="@/assets/logoFooter.png" alt="Footer Image" width="150" height="auto">
        </div>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterLogin',
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>

</style>
