<template>
  <v-flex xs12>
    <v-text-field
      v-model="value"
      :label="label"
      :type="type"
      required
      @keyup.enter="onSubmit"
    ></v-text-field>
  </v-flex>
</template>

<script>
export default {
  name: "In-put",
  props: {
    label: {type: String},
    type: {type: String, default: 'text'}
  },
  data() {
    return {
      value: "",
    };
  },
  methods: {
    onSubmit() {
      this.$emit("submit", this.value);
    },
  },
};
</script>
