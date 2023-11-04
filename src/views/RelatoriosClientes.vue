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
import ProdutoService from "@/services/produto-service"; // Certifique-se de importar o serviço de produtos correto
import RelatorioCard from "../components/RelatorioCard.vue"

export default {
  name: "Rel-Produtos",
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
          nome: "Relatório de Produtos por Categoria",
          descricao: "Este relatório exibe os produtos ordenados por categoria.",
          funcao: this.gerarRelatorioProdutosCategoria,
          icone: "mdi-format-list-bulleted",
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
    this.obterProdutos();
  },
  methods: {
    async obterProdutos() {
      try {
        const response = await ProdutoService.obterProdutos(); // Certifique-se de chamar o método correto do serviço de produtos
        this.produtos = response.data;
      } catch (error) {
        console.error("Erro ao obter produtos:", error);
      }
    },

    // Métodos para gerar relatórios
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

    async gerarRelatorioProdutosCategoria() {
      const doc = new jsPDF();
      doc.text('Relatório de Produtos por Categoria', 10, 10);
      const data = this.produtos.slice().sort((a, b) => a.categoria.localeCompare(b.categoria));
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
      doc.save('RelatorioProdutosCategoria.pdf');
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
