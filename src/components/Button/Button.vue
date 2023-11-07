<template>
  <v-btn class="button" @click="callback" color="#2D4F6C" dark>
    {{ value }}
  </v-btn>
</template>

<script>
export default {
  name: "ButtonPrincipal",
  props: {
    value: { type: String, required: true },
    callback: { type: Function, default: () => { alert('Botão sem função') } },
  }
};
</script>
