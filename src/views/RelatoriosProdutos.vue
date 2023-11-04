<template>
  <v-container class="mt-5">
    <v-row>
      <v-col v-for="relatorio in relatorios" :key="relatorio.nome" cols="12" sm="6" md="4" lg="3">
        <RelatorioCard :relatorio="relatorio" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import jsPDF from "jspdf";
import "jspdf-autotable";
import ProdutoService from "@/services/produto-service";
import RelatorioCard from "../components/RelatorioCard.vue"

export default {
  name: "relatoriosProdutos",
  components: {
    RelatorioCard
  },
  data() {
    return {
      produtos: [],
      relatorios: [
        {
          nome: "Relatório de Produtos por Preço",
          descricao: "Este relatório exibe os produtos ordenados por preço.",
          funcao: this.gerarRelatorioProdutosPreco,
          icone: "mdi-currency-usd",
        },
        {
          nome: "Relatório de Produtos em Estoque",
          descricao: "Este relatório exibe os produtos em estoque.",
          funcao: this.gerarRelatorioProdutosEstoque,
          icone: "mdi-package-variant-closed",
        },
        {
          nome: "Relatório de Produtos Esgotados",
          descricao: "Este relatório exibe os produtos esgotados.",
          funcao: this.gerarRelatorioProdutosEsgotados,
          icone: "mdi-package-variant",
        },
      ],
    };
  },
  created() {
    this.obterTodos();
  },
  methods: {
    async obterTodos() {
      try {
        const response = await ProdutoService.obterTodos();
        this.produtos = response.data;
      } catch (error) {
        console.error("Erro ao obter produtos:", error);
      }
    },

    async gerarRelatorioProdutosPreco() {
      const doc = new jsPDF();
      doc.text('Relatório de Produtos por Preço', 10, 10);
      const data = this.produtos.slice().sort((a, b) => a.valor - b.valor);
      const columns = ['ID', 'Nome', 'Preço', 'Categoria', 'Estoque'];
      const rows = data.map((produto) => [
        produto.id,
        produto.nome,
        `R$ ${produto.valor.toFixed(2)}`,
        produto.categoria,
        produto.quantidadeEstoque,
      ]);
      doc.autoTable({
        head: [columns],
        body: rows,
        startY: 20,
        theme: 'grid',
        tableWidth: 'auto',
        margin: { top: 25 },
      });
      doc.save('RelatorioProdutosPreco.pdf');
    },

    async gerarRelatorioProdutosEstoque() {
      const doc = new jsPDF();
      doc.text('Relatório de Produtos em Estoque', 10, 10);
      const data = this.produtos.filter((produto) => produto.quantidadeEstoque > 0);
      const columns = ['ID', 'Nome', 'Preço', 'Categoria', 'Estoque'];
      const rows = data.map((produto) => [
        produto.id,
        produto.nome,
        `R$ ${produto.valor.toFixed(2)}`,
        produto.categoria,
        produto.quantidadeEstoque,
      ]);
      doc.autoTable({
        head: [columns],
        body: rows,
        startY: 20,
        theme: 'grid',
        tableWidth: 'auto',
        margin: { top: 25 },
      });
      doc.save('RelatorioProdutosEstoque.pdf');
    },

    async gerarRelatorioProdutosEsgotados() {
      const doc = new jsPDF();
      doc.text('Relatório de Produtos Esgotados', 10, 10);
      const data = this.produtos.filter((produto) => produto.quantidadeEstoque <= 0);
      const columns = ['ID', 'Nome', 'Preço', 'Categoria', 'Estoque'];
      const rows = data.map((produto) => [
        produto.id,
        produto.nome,
        `R$ ${produto.valor.toFixed(2)}`,
        produto.categoria,
        produto.quantidadeEstoque,
      ]);
      doc.autoTable({
        head: [columns],
        body: rows,
        startY: 20,
        theme: 'grid',
        tableWidth: 'auto',
        margin: { top: 25 },
      });
      doc.save('RelatorioProdutosEsgotados.pdf');
    },
  },
};
</script>
