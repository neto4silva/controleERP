<template>
  <v-card>
    <v-card-title>
      <v-icon>{{ relatorio.icone }}</v-icon>
      <span class="relatorio-titulo">{{ relatorio.nome }}</span>
    </v-card-title>
    <v-card-text>
      {{ relatorio.descricao }}
    </v-card-text>
    <v-card-actions>
      <Button value="Baixar Relatório" :callback="relatorio.funcao"></Button>
    </v-card-actions>
  </v-card>
</template>

<script>
import Button from "../components/Button.vue";

export default {
  name: 'relatorioCard',
  props: {
    relatorio: Object,
  },
  components: {
    Button,
  },
};
</script>
