<template>
  <v-container>
    <div class="mt-5">
      <h1 class="text-h5">Registro de Venda</h1>

      <v-row>
        <v-col cols="12" md="6" lg="4">
          <v-select
            v-model="clienteSelecionado"
            :items="clientes"
            label="Selecione um Cliente"
            item-text="nome"
            item-value="id"
          ></v-select>
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
import Button from "../components/Button.vue";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Definir o filtro diretamente no componente
const valor = (value) => {
  if (!value) return "";
  return parseFloat(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export default {
  name: "ven-da",
  components: {
    Button
  },
  data() {
    return {
      clientes: [],
      clienteSelecionado: null,
      produtos: [],
      produtoSelecionado: null,
      quantidade: 1,
      vendaItens: [],
      headers: [
        { text: "Produto", value: "produto.nome" },
        { text: "Quantidade", value: "quantidade" },
        { text: "Valor Unitário", value: "produto.valor" },
        { text: "Subtotal", value: "subtotal" },
      ],
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
  created() {
    clienteService.obterTodos().then((response) => {
      this.clientes = response.data;
    });

    produtoService.obterTodos().then((response) => {
      this.produtos = response.data;
    });
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
      }
    },

    gerarPdfVenda() {
      if (this.clienteSelecionado && this.vendaItens.length > 0) {
        const cliente = this.clienteSelecionado;

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
              text: `Cliente: ${cliente.nome}`,
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
        this.$swal.fire({
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
        }).then((result) => {
          if (result.dismiss === this.$swal.DismissReason.timer) {
            pdfMake.createPdf(docDefinition).open();
          }
        });
        
      }
    },
  },
};
</script>
