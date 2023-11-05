<template>
  <v-container>
    <div>
      <h1>Dashboard</h1>
      <v-row>
        <v-col cols="12" md="3">
          <DashboardCard
            cardColor="success"
            cardTitle="Total de Clientes"
            cardIcon="mdi-account-multiple"
            :iconSize="64"
            :cardValue="totalClientes"
          ></DashboardCard>
        </v-col>

        <v-col cols="12" md="3">
          <DashboardCard
            cardColor="orange"
            cardTitle="Total de Produtos"
            cardIcon="mdi-shopping"
            :iconSize="64"
            :cardValue="totalProdutos"
          ></DashboardCard>
        </v-col>

        <v-col cols="12" md="3">
          <DashboardCard
            cardColor="blue"
            cardTitle="Vendas Mensais"
            cardIcon="mdi-currency-usd"
            :iconSize="64"
            :cardValue="vendasMensais"
          ></DashboardCard>
        </v-col>

        <v-col cols="12" md="3">
          <DashboardCard
            cardColor="purple"
            cardTitle="Novos Pedidos"
            cardIcon="mdi-cart"
            :iconSize="64"
            :cardValue="novosPedidos"
          ></DashboardCard>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <GraficosProdutos></GraficosProdutos>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import produtoService from "@/services/produto-service";
import clienteService from "@/services/cliente-service";
import DashboardCard from "@/components/DashboardCard.vue";
import GraficosProdutos from "../components/GraficosProdutos.vue";

export default {
  name: "dash-board",
  components: {
    DashboardCard,
    GraficosProdutos
  },
  data() {
    return {
      totalClientes: 0,
      totalProdutos: 0,
      vendasMensais: 0,
      novosPedidos: 0,
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
