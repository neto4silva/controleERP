<template>
  <v-container>
    <div class="mt-5">
      <h1 class="text-h5">Registro de Venda</h1>

      <v-row>
        <v-col cols="12" md="6" lg="4">
          <v-autocomplete
            v-model="clienteSelecionado"
            :items="clientes"
            label="Selecione um Cliente"
            item-text="nome"
            item-value="nome"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" md="6" lg="4">
          <v-select
            v-model="produtoSelecionado"
            :items="produtos"
            label="Selecione um Produto"
            item-text="nome"
            item-value="id"
          ></v-select>
        </v-col>

        <v-col cols="12" md="4" lg="2">
          <v-text-field
            v-model="quantidade"
            label="Quantidade"
            type="number"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="2" lg="2">
          <Button value="Adicionar Item" :callback="adicionarItem"></Button>
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider>

      <v-data-table :items="vendaItens" :headers="headers" hide-default-footer>
        <!-- eslint-disable vue/valid-v-slot -->
        <template v-slot:item.valor="{ item }">
          {{ item.produto.valor | valor }}
        </template>
        <template v-slot:item.subtotal="{ item }">
          {{ item.subtotal | valor }}
        </template>
      </v-data-table>

      <v-divider class="my-4"></v-divider>

      <v-row>
        <v-col cols="12" md="8" lg="10">
          <Button value="Gerar Venda" :callback="gerarPdfVenda"></Button>
        </v-col>
        <v-col cols="12" md="4" lg="2" class="text-right">
          <strong>Total: {{ totalVenda | valor }}</strong>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import produtoService from "@/services/produto-service";
import clienteService from "@/services/cliente-service";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Button from "@/components/Button/Button.vue";
import Cliente from "@/models/cliente-model";
import Produto from "@/models/produto-model";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const valor = (value) => {
  if (!value) return "";
  return parseFloat(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export default {
  name: "RegistroVenda",
  components: {
    Button,
  },
  data() {
    return {
      clientes: [],
      clienteSelecionado: null,
      clienteParaPDF: null,
      produtos: [],
      produtoSelecionado: null,
      quantidade: 1,
      vendaItens: [],
      headers: [
        { text: "Produto", value: "produto.nome" },
        { text: "Quantidade", value: "quantidade" },
        { text: "Valor Unitário", value: "produto.valor" },
        { text: "Subtotal", value: "subtotal" },
        { text: "Ação", value: "action", sortable: false },
      ],
      editModal: false,
      editedItem: {
        quantidade: 0,
        produto: {
          valor: 0,
        },
      },
    };
  },
  computed: {
    totalVenda() {
      return this.vendaItens.reduce(
        (total, item) => total + (item.subtotal || 0),
        0
      );
    },
  },
  filters: {
    valor,
  },
  methods: {
    adicionarItem() {
      if (
        !this.clienteSelecionado ||
        !this.produtoSelecionado ||
        this.quantidade <= 0
      ) {
        return;
      }

      const produto = this.produtos.find(
        (p) => p.id === this.produtoSelecionado
      );

      if (produto) {
        const subtotal = produto.valor * this.quantidade;

        this.vendaItens.push({
          produto: produto,
          quantidade: this.quantidade,
          subtotal: subtotal,
        });

        this.produtoSelecionado = null;
        this.quantidade = 1;
        console.log(this.clienteSelecionado.telefone)
      }
    },
    async obterTodosOsClientes() {
      try {
        const response = await clienteService.obterTodos();
        let clientes = response.data.map((c) => new Cliente(c));

        this.clientes = clientes.sort(this.ordenarClientes).reverse();
      } catch (error) {
        console.log(error);
        this.$swal.fire(
          "Erro",
          "Ocorreu um erro ao obter os clientes",
          "error"
        );
      }
    },
    async obterTodosOsProdutos() {
      try {
        const response = await produtoService.obterTodos();
        let produtos = response.data.map((p) => new Produto(p));

        this.produtos = produtos.sort(this.ordenarProdutos).reverse();
      } catch (error) {
        console.log(error);
        this.$swal.fire({
          title: "Erro",
          text: "Erro ao obter produtos: " + error,
          icon: "error",
        });
      }
    },

    gerarPdfVenda() {
      if (this.clienteSelecionado && this.vendaItens.length > 0) {
        this.clienteParaPDF = this.clienteSelecionado;

        const docDefinition = {
          content: [
            {
              text: "Registro de Venda",
              style: "header",
            },
            {
              text: `Data: ${new Date().toLocaleDateString()}`,
              style: "subheader",
            },
            {
              text: `Cliente: ${this.clienteParaPDF}`,
              style: "subheader",
            },
            {
              text: "Itens da Venda",
              style: "subheader",
            },
            {
              table: {
                headerRows: 1,
                widths: ["auto", "*", "auto", "auto"],
                body: [
                  ["Produto", "Quantidade", "Valor Unitário", "Subtotal"],
                  ...this.vendaItens.map((item) => [
                    item.produto.nome,
                    item.quantidade,
                    item.produto.valor,
                    item.subtotal,
                  ]),
                ],
              },
            },
            {
              text: `Total: ${this.totalVenda | valor}`,
              style: "subheader",
            },
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              alignment: "center",
            },
            subheader: {
              fontSize: 14,
              bold: true,
              margin: [0, 10, 0, 0],
            },
          },
        };

        let timerInterval;
        this.$swal
          .fire({
            title: "A venda está sendo Gerada",
            html: "Sua venda estará pronta em <b></b>",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              this.$swal.showLoading();
              const b = this.$swal.getHtmlContainer().querySelector("b");
              timerInterval = setInterval(() => {
                b.textContent = this.$swal.getTimerLeft();
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          })
          .then((result) => {
            if (result.dismiss === this.$swal.DismissReason.timer) {
              pdfMake.createPdf(docDefinition).open();
            }
          });
      }
    },

    openEditModal(item) {
      this.editedItem = { ...item };
      this.editModal = true;
    },
  },
  created() {
    this.obterTodosOsClientes();
    this.obterTodosOsProdutos();
  },
};
</script>
