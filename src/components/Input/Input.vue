<template>
  <v-flex xs12>
    <v-text-field
      v-model="valor"
      :label="label"
      :type="type"
      required
      @keyup.enter="$emit('enter')"
    ></v-text-field>
  </v-flex>
</template>

<script>
export default {
  name: "in-put",
  model: {
    prop: "value",
    event: "onChange",
  },
  props: {
    label: { type: String },
    type: { type: String, default: "text" },
    value: { type: String },
  },
  data() {
    return {
      valor: this.value,
    };
  },
  watch: {
    valor() {
      this.$emit("onChange", this.valor);
    },
  },
};
</script>
