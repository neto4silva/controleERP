<template>
    <v-btn @click="callback" color="#2D4F6C" dark>
      {{ value }}
    </v-btn>
  </template>
  
  <script>
  export default {
    name: "Bo-tao",
    props: {
      value: { type: String, required: true },
      callback: { type: Function, default: () => {} },
    },
  };
  </script>
  
  