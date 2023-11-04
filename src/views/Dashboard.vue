<template>
  <v-container>
    <div>
      <h1>Dashboard</h1>
      <v-row>
        <v-col cols="12" md="3">
          <v-card class="mb-4" color="success">
            <v-card-title class="white--text">Total de Clientes</v-card-title>
            <v-card-text class="text-center">
              <v-row align="center">
                <v-col cols="2">
                  <v-icon size="64" color="white" class="icon-background"
                    >mdi-account-multiple</v-icon
                  >
                </v-col>
                <v-col cols="10" class="text-right">
                  <h1 class="white--text" style="font-size: 3rem">
                    {{ totalClientes }}
                  </h1>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card class="mb-4" color="orange">
            <v-card-title class="white--text">Total de Produtos</v-card-title>
            <v-card-text class="text-center">
              <v-row align="center">
                <v-col cols="2">
                  <v-icon size="64" color="white" class="icon-background"
                    >mdi-shopping</v-icon
                  >
                </v-col>
                <v-col cols="10" class="text-right">
                  <h1 class="white--text" style="font-size: 3rem">
                    {{ totalProdutos }}
                  </h1>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card class="mb-4" color="blue">
            <v-card-title class="white--text">Vendas Mensais</v-card-title>
            <v-card-text class="text-center">
              <v-row align="center">
                <v-col cols="2">
                  <v-icon size="64" color="white" class="icon-background"
                    >mdi-currency-usd</v-icon
                  >
                </v-col>
                <v-col cols="10" class="text-right">
                  <h2 class="white--text">Em implementação</h2>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card class="mb-4" color="purple">
            <v-card-title class="white--text">Novos Pedidos</v-card-title>
            <v-card-text class="text-center">
              <v-row align="center">
                <v-col cols="2">
                  <v-icon size="64" color="white" class="icon-background"
                    >mdi-cart</v-icon
                  >
                </v-col>
                <v-col cols="10" class="text-right">
                  <h2 class="white--text">Em implementação</h2>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <GraficosProdutos></GraficosProdutos>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import produtoService from "@/services/produto-service";
import clienteService from "@/services/cliente-service";
import GraficosProdutos from '@/components/GraficosProdutos.vue';

export default {
  name: "Dash-board",
  components: {
    GraficosProdutos,
  },
  data() {
    return {
      totalClientes: 0,
      totalProdutos: 0,
      mostrarClientes: false,
      mostrarProdutos: false,
      clientes: [],
      produtos: [],
    };
  },
  created() {
    this.obterTotalClientes();
    this.obterTotalProdutos();
  },
  methods: {
    obterTotalClientes() {
      clienteService
        .obterTodos()
        .then((response) => {
          this.totalClientes = response.data.length;
        })
        .catch((error) => {
          console.error("Erro ao obter total de clientes:", error);
        });
    },
    obterTotalProdutos() {
      produtoService
        .obterTodos()
        .then((response) => {
          this.totalProdutos = response.data.length;
        })
        .catch((error) => {
          console.error("Erro ao obter total de produtos:", error);
        });
    },
  },
};
</script>