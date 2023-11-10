<template>
  <div>
    <v-container>
      <h1>Produtos</h1>
      <v-divider class="mb-10 mt-4"></v-divider>
      <v-row class="mb-4" v-if="isMobile">
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
          <v-btn @click="visualizarEmTabela" icon>
            <v-icon>mdi-table</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="produto in produtos" :key="produto.id" cols="12" md="3">
          <v-card class="mb-4" @click="abrirModalEdicao(produto)">
            <img
              :src="imagemProdutoUrl"
              alt="Imagem do Produto"
              width="100%"
              style="max-height: 200px"
            />
            <v-card-title class="text-h5"
              >{{ produto.nome }}
              <v-chip
                v-if="produto.quantidadeEstoque < 0"
                color="red"
                text-color="white"
                class="ml-7"
              >
                Estoque Negativo
              </v-chip></v-card-title
            >
            <v-card-text>
              <div><strong>Descrição:</strong> {{ produto.observacao }}</div>
            </v-card-text>
            <v-card-text class="text-h6">
              {{ produto.valor | valor }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="modalAberto" max-width="600px">
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
            <v-text-field v-model="Produto.valor" label="Valor"></v-text-field>
            <v-text-field
              v-model="Produto.quantidadeEstoque"
              label="Quantidade em Estoque"
            ></v-text-field>
            <v-textarea
              v-model="Produto.observacao"
              label="Observação"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn v-if="edicao" @click="excluirProduto(Produto.id)" color="error"
            >Excluir</v-btn
          >
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-btn @click="modalAberto = false">Fechar</v-btn>
          <v-btn v-if="!edicao" @click="adicionarProduto()" color="primary"
            >Adicionar</v-btn
          >
          <v-btn v-else @click="editarProduto()" color="primary">Editar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ProdutoMixin from "../mixins/produto-mixin";
import Button from "../components/Button/Button.vue";

export default {
  name: "ProdutosCard",
  components: {
    Button,
  },
  mixins: [ProdutoMixin],
  data() {
    return {
      isMobile: false,
    };
  },
  mounted() {
    this.isMobile = window.innerWidth < 600;
    window.addEventListener("resize", this.verificarTamanhoDaTela);
  },
  methods: {
    verificarTamanhoDaTela() {
      this.isMobile = window.innerWidth < 600;
    },
    visualizarEmTabela() {
      this.$router.push("/controle-de-produtos");
    },
  },
};
</script>

<style>
.table-with-pointer tbody tr:hover {
  cursor: pointer;
}
</style>
