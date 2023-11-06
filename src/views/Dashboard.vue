<template>
  <v-container>
    <div class="dashboard">
      <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
        <h1>Dashboard</h1>
      </v-subheader>
      <br />
      <v-row>
        <v-col lg="7" cols="12">
          <v-alert dense text type="success">
                    Acesso concedigo! Bem vindo ao <strong>Netoworks</strong>
                </v-alert>
          <v-row>
            <v-col
              lg="6"
              cols="12"
              v-for="(item, index) in activityLog"
              :key="index"
            >
              <v-card elevation="2" class="rounded-lg">
                <v-card-text class="d-flex justify-space-between align-center">
                  <div>
                    <strong>{{ item.title }}</strong> <br />
                    <span>Últimas 3 semanas</span>
                  </div>
                  <v-avatar
                    size="60"
                    :color="item.color"
                    style="border: 3px solid #444"
                  >
                    <span style="color: white">{{ item.title === 'Total de Produtos' ? totalProdutos : totalClientes }}</span>
                  </v-avatar>
                </v-card-text>
                <v-card-actions class="d-flex justify-space-between">
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" lg="5">
          <v-card>
            <v-card-title>Atividades</v-card-title>
            <v-card-text class="py-0">
              <v-timeline align-top dense>
                <v-timeline-item color="indigo" small>
                  <strong>5 minutos atrás</strong>
                  <div class="text-caption">
                    Você tem um novo pedido, por favor, verifique isso
                  </div>
                </v-timeline-item>
                <v-timeline-item color="green" small>
                  <strong>35 minutos atrás</strong>
                  <div class="text-caption mb-2">Um produto foi entregue!</div>
                </v-timeline-item>
                <v-timeline-item color="indigo" small>
                  <strong>44 minutos atrás</strong>
                  <div class="text-caption">
                    Você tem um novo pedido, por favor, verifique isso
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-col>
        <graficos-produtos />
      </v-row>
    </div>
  </v-container>
</template>

<script>
import GraficosProdutos from "../components/GraficosProdutos.vue";
import produtoService from "@/services/produto-service";
import clienteService from "@/services/cliente-service";

export default {
  name: "painel-de-controle",
  components: {
    GraficosProdutos,
  },
  data() {
    return {
      activityLog: [
        {
          title: "Total de Produtos",
          icon: "mdi-account",
          color: "cyan lighten-3",
        },
        {
          title: "Total de Clientes",
          icon: "mdi-account-group-outline",
          color: "green darken-2",
        },
        {
          title: "Total de Vendas",
          icon: "mdi-account-group-outline",
          color: "blue-grey darken-1",
        },
        {
          title: "Pedidos Pendentes",
          icon: "mdi-account-group-outline",
          color: "deep-orange darken-1",
        },
      ],
      totalClientes: 0, 
      totalProdutos: 0,
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

<style scoped>
.sobreposicao-de-ícone {
  position: absolute;
  top: -33px;
  text-align: center;
  padding-top: 12px;
}
</style>
