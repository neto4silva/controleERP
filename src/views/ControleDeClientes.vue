<template>
  <div>
    <v-container>
      <h1>Clientes</h1>
      <v-divider class="mb-10 mt-4"></v-divider>
      <v-row class="mb-4">
        <v-col>
          <v-row align="center">
            <v-col>
              <Button value="Adicionar" :callback="abrirModalAdicao"></Button>
            </v-col>
            <v-col>
              <v-select
                v-model="filtro"
                :items="tiposFiltro"
                label="Filtrar por"
                hide-details
              ></v-select>
            </v-col>
            <v-col>
              <v-text-field
                v-model="pesquisa"
                label="Pesquisar cliente"
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="text-right">
          <v-col class="text-right">
            <v-btn @click="visualizarCards" icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-btn>
          </v-col>
        </v-col>
      </v-row>

      <v-data-table
        :items="clientesFiltrados"
        :headers="headers"
        item-key="id"
        @click:row="abrirModalEdicao"
        class="table-with-pointer"
        hide-default-footer
        :items-per-page="1000"
      >
        <!-- eslint-disable vue/valid-v-slot -->
        <template v-slot:item.dataCadastro="{ item }">
          {{ item.dataCadastro | data }}
        </template>
      </v-data-table>
    </v-container>

    <v-dialog v-model="modalAberto" max-width="600px">
      <v-card>
        <v-card-title v-if="!edicao">Adicionar Cliente</v-card-title>
        <v-card-title v-else>Editar Cliente</v-card-title>
        <v-card-text>
          <v-form
            @submit.prevent="edicao ? editarCliente() : adicionarCliente()"
          >
            <v-text-field
              v-model="cliente.nome"
              label="Nome do Cliente"
            ></v-text-field>
            <v-text-field
              v-model="cliente.cpfOuCnpj"
              label="CPF ou CNPJ"
            ></v-text-field>
            <v-text-field v-model="cliente.email" label="E-mail"></v-text-field>
            <v-text-field
              v-model="cliente.telefone"
              label="Telefone"
            ></v-text-field>
            <v-text-field
              v-model="cliente.idUsuario"
              label="ID do Usuário"
            ></v-text-field>
            <v-checkbox
              v-if="!edicao"
              v-model="manterAberto"
              label="Continuar adicionando"
            ></v-checkbox>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn v-if="edicao" @click="excluirCliente(cliente.id)" color="error"
            >Excluir</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn @click="modalAberto = manterAberto">Fechar</v-btn>
          <v-btn v-if="!edicao" @click="adicionarCliente" color="#2D4F6C" dark
            >Adicionar</v-btn
          >
          <v-btn v-else @click="editarCliente" color="#2D4F6C" dark
            >Editar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Button from "@/components/Button/Button.vue";
import ClienteMixins from "../mixins/cliente-mixin";

export default {
  name: "ControleDeClientes",
  mixins: [ClienteMixins],
  components: {
    Button,
  },
  methods: {
    visualizarCards() {
      this.$router.push("/clientes");
    },
  },
};
</script>

<style>
.table-with-pointer tbody tr:hover {
  cursor: pointer;
}
</style>
