<template>
  <div>
    <v-container>
      <h1>Produtos</h1>
      <v-divider class="mb-10 mt-4"></v-divider>

      <v-row>
        <v-col v-for="produto in produtos" :key="produto.id" cols="12" md="3">
          <v-card class="mb-4" @click="abrirModalEdicao(produto)">
            <img :src="imagemProdutoUrl" alt="Imagem do Produto" width="100%" />
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
import produtoService from "@/services/produto-service";
import Produto from "@/models/produto-model";
import conversorData from "@/utils/conversor-data";
import conversorMonetario from "@/utils/conversor-monetario";

export default {
  name: "pro-dutos",
  filters: {
    data(data) {
      return conversorData.aplicarMascaraDataHoraEmDataIso(data);
    },
    valor(value) {
      return conversorMonetario.aplicarMascaraParaRealcomPrefixo(value);
    },
  },
  data() {
    return {
      produtos: [],
      modalAberto: false,
      Produto: new Produto(),
      edicao: false,
      continuarAdicionando: false,
      imagemProdutoUrl: "https://via.placeholder.com/100",
    };
  },

  created() {
    this.obterTodosOsProdutos();
  },

  methods: {
    abrirModalAdicao() {
      this.Produto = new Produto();
      this.edicao = false;
      this.modalAberto = true;
      this.continuarAdicionando = false;
    },

    abrirModalEdicao(produto) {
      this.Produto = new Produto(produto);
      this.edicao = true;
      this.modalAberto = true;
      this.continuarAdicionando = false;
    },

    adicionarProduto() {
      produtoService
        .cadastrar(this.Produto)
        .then(() => {
          this.Produto = new Produto();
          this.obterTodosOsProdutos();
          if (!this.continuarAdicionando) {
            this.modalAberto = false;
          }
        })
        .catch((error) => {
          console.error("Erro ao adicionar o produto:", error);
        });
    },

    editarProduto() {
      produtoService
        .atualizar(this.Produto)
        .then(() => {
          this.Produto = new Produto();
          this.obterTodosOsProdutos();
          this.modalAberto = false;
        })
        .catch((error) => {
          console.error("Erro ao editar o produto:", error);
        });
    },

    visualizarCards() {
      this.$router.push("/relatorios-produtos");
    },

    obterTodosOsProdutos() {
      produtoService
        .obterTodos()
        .then((response) => {
          this.produtos = response.data.map((p) => new Produto(p));
        })
        .catch((error) => {
          console.log(error);
        });
    },

    excluirProduto(id) {
      if (confirm("Deseja excluir este produto?")) {
        produtoService
          .deletar(id)
          .then(() => {
            this.obterTodosOsProdutos();
            this.modalAberto = false;
          })
          .catch((error) => {
            console.error("Erro ao excluir o produto:", error);
          });
      }
    },
  },
};
</script>

<style>
.table-with-pointer tbody tr:hover {
  cursor: pointer;
}
</style>
