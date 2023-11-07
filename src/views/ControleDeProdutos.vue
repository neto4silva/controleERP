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
      @click:outside="fecharModalPorCliqueExterno"
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
          <v-btn @click="beforeFecharModal"
            >Fechar</v-btn
          >
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
import produtoService from "@/services/produto-service";
import Produto from "@/models/produto-model";
import conversorData from "@/utils/conversor-data";
import conversorMonetario from "@/utils/conversor-monetario";
import Button from "@/components/Button/Button.vue";

export default {
  name: "ControleDeProdutos",
  components: {
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
      pesquisa: "",
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
      Produto: new Produto(),
      edicao: false,
      continuarAdicionando: false,
    };
  },

  mounted() {
    this.obterTodosOsProdutos();
  },

  computed: {
    produtosFiltrados() {
      if (!this.pesquisa) {
        return this.produtos;
      }
      const pesquisaLowerCase = this.pesquisa.toLowerCase();
      return this.produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(pesquisaLowerCase)
      );
    },
  },

  methods: {
    abrirModalAdicao() {
      this.Produto = new Produto();
      this.Produto.dataCadastro = new Date();
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
          this.$swal.fire({
            position: "center",
            icon: "success",
            title: "Produto cadastrado com sucesso",
            showConfirmButton: false,
            timer: 1500,
          });
          this.Produto = new Produto();
          this.obterTodosOsProdutos();
          if (!this.continuarAdicionando) {
            this.modalAberto = false;
          }
        })
        .catch((error) => {
          this.$swal.fire({
            title: "Erro",
            text: "Erro ao adicionar o produto: " + error,
            icon: "error",
          });
        });
    },

    editarProduto() {
      produtoService
        .atualizar(this.Produto)
        .then(() => {
          this.$swal.fire({
            position: "center",
            icon: "success",
            title: "Produto editado com sucesso",
            showConfirmButton: false,
            timer: 1500,
          });
          this.Produto = new Produto();
          this.obterTodosOsProdutos();
          this.modalAberto = false;
        })
        .catch((error) => {
          this.$swal.fire({
            title: "Erro",
            text: "Erro ao editar o produto: " + error,
            icon: "error",
          });
        });
    },

    validarValor() {
      if (isNaN(this.Produto.valor)) {
        this.$swal.fire({
          title: "Erro",
          text: "O campo Valor deve conter apenas números.",
          icon: "error",
        });
        this.Produto.valor = "";
      }
    },

    validarQuantidade() {
      if (isNaN(this.Produto.quantidadeEstoque)) {
        this.$swal.fire({
          title: "Erro",
          text: "O campo Quantidade em Estoque deve conter apenas números.",
          icon: "error",
        });
        this.Produto.quantidadeEstoque = "";
      }
    },

    visualizarCards() {
      this.$router.push("/produtos");
    },

    ordenarProdutos(produto, produtos) {
      return produto.id < produtos.id ? -1 : produto.id > produtos.id ? 1 : 0;
    },

    obterTodosOsProdutos() {
      produtoService
        .obterTodos()
        .then((response) => {
          let produtos = response.data.map((p) => new Produto(p));

          this.produtos = produtos.sort(this.ordenarProdutos).reverse();
        })
        .catch((error) => {
          this.$swal.fire({
            title: "Erro",
            text: "Erro ao obter produtos: " + error,
            icon: "error",
          });
        });
    },

    excluirProduto(id) {
      this.$swal
        .fire({
          title: "Excluir Produto",
          text: "Deseja excluir este produto?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sim",
          cancelButtonText: "Não",
        })
        .then((result) => {
          if (result.isConfirmed) {
            produtoService
              .deletar(id)
              .then(() => {
                this.$swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Produto excluído com sucesso",
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.obterTodosOsProdutos();
                this.modalAberto = false;
              })
              .catch((error) => {
                this.$swal.fire({
                  title: "Erro",
                  text: "Erro ao excluir o produto: " + error,
                  icon: "error",
                });
              });
          }
        });
    },

    beforeFecharModal() {
      if (
        (this.Produto.nome ||
          this.Produto.valor ||
          this.Produto.quantidadeEstoque ||
          this.Produto.observacao) &&
        !this.edicao
      ) {
        this.$swal
          .fire({
            title: "Dados não salvos!",
            text: "Você tem dados não salvos. Deseja realmente fechar o modal?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Fechar",
            cancelButtonText: "Cancelar",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.modalAberto = false;
              this.Produto = new Produto();
            }
          });
      } else {
        this.modalAberto = false;
        this.Produto = new Produto();
      }
    },
    fecharModalPorCliqueExterno() {
      this.beforeFecharModal();
    },
  },
};
</script>

<style>
.table-with-pointer tbody tr:hover {
  cursor: pointer;
}
</style>
