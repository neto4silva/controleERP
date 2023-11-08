import Produto from "@/models/produto-model";
import conversorData from "@/utils/conversor-data";
import conversorMonetario from "@/utils/conversor-monetario";
import produtoService from "../services/produto-service";

let ProdutoMixin = {
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
      Produto: new Produto(),
      modalAberto: false,
      edicao: false,
      continuarAdicionando: false,
      imagemProdutoUrl: "https://via.placeholder.com/700",
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
      this.Produto = new Produto({
        dataCadastro: new Date(),
      });
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
            timer: 1000,
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
            confirmButtonColor: "#2D4F6C"
          });
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
            confirmButtonColor: "#2D4F6C"
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
  },
};

export default ProdutoMixin;
