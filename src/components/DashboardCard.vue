<template>
  <v-card class="mb-4" :color="cardColor">
    <v-card-title class="white--text">{{ cardTitle }}</v-card-title>
    <v-card-text class="text-center">
      <v-row align="center">
        <v-col cols="2">
          <v-icon :size="iconSize" color="white" class="icon-background">
            {{ cardIcon }}
          </v-icon>
        </v-col>
        <v-col cols="10" class="text-right">
          <h1 class="white--text" style="font-size: 3rem">
            {{ cardValue }}
          </h1>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "dashboardCard",
  props: {
    cardColor: String,
    cardTitle: String,
    cardIcon: String,
    iconSize: Number,
    cardValue: Number,
  },
};
</script>
