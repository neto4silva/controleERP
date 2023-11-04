<template>
  <div>
    <Menu></Menu>
    <v-container>
      <h1>Produtos</h1>
      <v-divider class="mb-10 mt-4"></v-divider>
      <v-row class="mb-4">
        <v-col>
          <Button value="Adicionar" :callback="abrirModalAdicao"></Button>
        </v-col>
        <v-col class="text-right">
          <v-btn @click="visualizarCards" icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-data-table
        :items="produtos"
        :headers="headers"
        item-key="id"
        @click:row="abrirModalEdicao"
        class="table-with-pointer"
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

    <Cadastro
      :modalAberto.sync="modalAberto"
      :adicionarTitulo="'Adicionar Produto'"
      :editarTitulo="'Editar Produto'"
      :edicao.sync="edicao"
      @adicionar="adicionarProduto"
      @editar="editarProduto"
      @excluir="excluirProduto"
    >
      <v-text-field
        v-model="produto.nome"
        label="Nome do Produto"
      ></v-text-field>
      <v-text-field v-model="produto.valor" label="Valor"></v-text-field>
      <v-text-field
        v-model="produto.quantidadeEstoque"
        label="Quantidade em Estoque"
      ></v-text-field>
      <v-textarea v-model="produto.observacao" label="Observação"></v-textarea>
    </Cadastro>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import produtoService from "@/services/produto-service";
import Produto from "@/models/produto-model";
import conversorData from "@/utils/conversor-data";
import conversorMonetario from "@/utils/conversor-monetario";
import Button from "../components/Button.vue";

export default {
  name: "ControleDeProdutos",
  components: {
    Menu,
    Button,
  },
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
      headers: [
        {
          text: "ID",
          value: "id",
        },
        {
          text: "Nome",
          value: "nome",
        },
        {
          text: "Valor",
          value: "valor",
        },
        {
          text: "Quantidade",
          value: "quantidadeEstoque",
        },
        {
          text: "Data de Cadastro",
          value: "dataCadastro",
        },
      ],

      modalAberto: false,
      produto: new Produto(),
      edicao: false,
      continuarAdicionando: false,
    };
  },

  created() {
    this.obterTodosOsProdutos();
  },

  methods: {
    abrirModalAdicao() {
      this.produto = new Produto();
      this.produto.dataCadastro = new Date();
      this.edicao = false;
      this.modalAberto = true;
      this.continuarAdicionando = false;
    },

    abrirModalEdicao(produto) {
      this.produto = new Produto(produto);
      this.edicao = true;
      this.modalAberto = true;
      this.continuarAdicionando = false;
    },

    adicionarProduto() {
      produtoService
        .cadastrar(this.produto)
        .then(() => {
          this.$swal({
            position: "center",
            icon: "success",
            title: "Produto cadastrado com sucesso",
            showConfirmButton: false,
            timer: 1500,
          });
          this.produto = new Produto();
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
        .atualizar(this.produto)
        .then(() => {
          this.$swal({
            position: "center",
            icon: "success",
            title: "Produto editado com sucesso",
            showConfirmButton: false,
            timer: 1500,
          });
          this.produto = new Produto();
          this.obterTodosOsProdutos();
          this.modalAberto = false;
        })
        .catch((error) => {
          console.error("Erro ao editar o produto:", error);
        });
    },

    visualizarCards() {
      this.$router.push("/produtos");
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
