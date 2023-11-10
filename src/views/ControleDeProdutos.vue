<template>
  <div>
    <v-container>
      <h1>Produtos</h1>
      <v-divider class="mb-10 mt-4"></v-divider>
      <v-row class="mb-4">
        <v-col>
          <Button
            data-testid="adicionar-btn"
            value="Adicionar"
            :callback="abrirModalAdicao"
          ></Button>
        </v-col>
        <v-col>
          <v-text-field
            v-model="pesquisa"
            label="Pesquisar produto"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col class="text-right">
          <v-btn @click="visualizarCards" icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-data-table
        :items="produtosFiltrados"
        :headers="headers"
        item-key="id"
        @click:row="abrirModalEdicao"
        class="table-with-pointer"
        hide-default-footer
        :items-per-page="1000"
      >
        <!-- eslint-disable vue/valid-v-slot -->
        <template v-slot:item.valor="{ item }">
          {{ item.valor | valor }}
        </template>
        <template v-slot:item.dataCadastro="{ item }">
          {{ item.dataCadastro | data }}
        </template>
      </v-data-table>
    </v-container>

    <v-dialog
      v-model="modalAberto"
      max-width="600px"
      @before-leave="beforeFecharModal"
    >
      <v-card>
        <v-card-title v-if="!edicao">Adicionar Produto</v-card-title>
        <v-card-title v-else>Editar Produto</v-card-title>
        <v-card-text>
          <v-form
            @submit.prevent="edicao ? editarProduto() : adicionarProduto()"
          >
            <v-text-field
              v-model="Produto.nome"
              label="Nome do Produto"
            ></v-text-field>
            <v-text-field
              v-model="Produto.valor"
              label="Valor"
              @blur="validarValor"
            ></v-text-field>
            <v-text-field
              v-model="Produto.quantidadeEstoque"
              label="Quantidade em Estoque"
              @blur="validarQuantidade"
            ></v-text-field>
            <v-textarea
              v-model="Produto.observacao"
              label="Observação"
            ></v-textarea>

            <v-checkbox
              v-if="!edicao"
              v-model="continuarAdicionando"
              label="Continuar adicionando"
            ></v-checkbox>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn v-if="edicao" @click="excluirProduto(Produto.id)" color="error"
            >Excluir</v-btn
          >
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-btn @click="beforeFecharModal">Fechar</v-btn>
          <v-btn
            v-if="!edicao"
            @click="adicionarProduto()"
            color="#2D4F6C"
            dark
            data-testid="modal-adicionar-btn"
            >Adicionar</v-btn
          >
          <v-btn
            v-else
            @click="editarProduto()"
            color="#2D4F6C"
            dark
            data-testid="modal-editar-btn"
            >Editar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Button from "@/components/Button/Button.vue";
import ProdutoMixin from "../mixins/produto-mixin";

export default {
  name: "ControleDeProdutos",
  mixins: [ProdutoMixin],
  components: {
    Button,
  },
  methods: {
    visualizarCards() {
      this.$router.push("/produtos");
    },    
  },
};
</script>

<style>
.table-with-pointer tbody tr:hover {
  cursor: pointer;
}

.table-with-pointer th {
  background-color: rgba(45, 79, 108, 0.5);
}
</style>
