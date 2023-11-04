<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card class="mb-4">
          <v-card-title>Produtos com Maior Estoque</v-card-title>
          <v-card-text>
            <canvas ref="chartMaiorEstoque" class="chart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card class="mb-4">
          <v-card-title>Produtos com Estoque Zerado ou Negativo</v-card-title>
          <v-card-text>
            <canvas ref="chartZeradoNegativo" class="chart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import produtoService from "@/services/produto-service";
import { Chart } from 'chart.js/auto';

export default {
  name: "GraficosProdutos",
  data() {
    return {
      produtos: [],
    };
  },
  computed: {
    produtosEstoqueMaior() {
      return this.produtos
        .slice()
        .sort((a, b) => b.quantidadeEstoque - a.quantidadeEstoque)
        .slice(0, 10);
    },
    produtosEstoqueZeradoNegativo() {
      return this.produtos.filter((produto) => produto.quantidadeEstoque <= 0);
    },
  },
  created() {
    this.obterProdutos();
  },
  methods: {
    obterProdutos() {
      produtoService
        .obterTodos()
        .then((response) => {
          this.produtos = response.data;

          this.criarGraficos();
        })
        .catch((error) => {
          console.error("Erro ao obter produtos:", error);
        });
    },
    criarGraficos() {
      const ctxMaiorEstoque = this.$refs.chartMaiorEstoque;
      new Chart(ctxMaiorEstoque, {
        type: "line",
        data: {
          labels: this.produtosEstoqueMaior.map((produto) => produto.nome),
          datasets: [
            {
              label: "Quantidade de Estoque",
              data: this.produtosEstoqueMaior.map((produto) => produto.quantidadeEstoque),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 3,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      const ctxZeradoNegativo = this.$refs.chartZeradoNegativo;
      new Chart(ctxZeradoNegativo, {
        type: "line",
        data: {
          labels: this.produtosEstoqueZeradoNegativo.map((produto) => produto.nome),
          datasets: [
            {
              label: "Quantidade de Estoque",
              data: this.produtosEstoqueZeradoNegativo.map((produto) => produto.quantidadeEstoque),
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 3,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
};
</script>
