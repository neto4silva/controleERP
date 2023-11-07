<template>
  <v-container class="mt-5">
    <v-row>
      <v-col
        v-for="relatorio in relatorios"
        :key="relatorio.nome"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <RelatorioCard :relatorio="relatorio" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import jsPDF from "jspdf";
import "jspdf-autotable";
import ClienteService from "@/services/cliente-service";
import RelatorioCard from "../components/Cards/RelatorioCard.vue";

export default {
  name: "RelatoriosClientes",
  components: {
    RelatorioCard,
  },
  data() {
    return {
      relatorios: [
        {
          nome: "Relatório de Clientes por Nome",
          descricao: "Este relatório exibe os clientes ordenados por nome.",
          funcao: this.gerarRelatorioClientesNome,
          icone: "mdi-account",
        },
        {
          nome: "Relatório de Clientes por Email",
          descricao: "Este relatório exibe os clientes ordenados por email.",
          funcao: this.gerarRelatorioClientesEmail,
          icone: "mdi-email",
        },
        {
          nome: "Relatório de Clientes por CPF",
          descricao: "Este relatório exibe os clientes ordenados por CPF.",
          funcao: this.gerarRelatorioClientesCPF,
          icone: "mdi-account-filter-outline",
        },
        {
          nome: "Relatório de Clientes por Telefone",
          descricao: "Este relatório exibe os clientes ordenados por telefone.",
          funcao: this.gerarRelatorioClientesTelefone,
          icone: "mdi-phone",
        },
      ],
    };
  },
  methods: {
    async gerarRelatorioClientesNome() {
      const clientes = await ClienteService.obterTodos();
      const doc = new jsPDF();

      doc.text("Relatório de Clientes por Nome", 10, 10);

      const data = clientes.data.sort((a, b) => a.nome.localeCompare(b.nome));

      const columns = ["ID", "Nome", "Email", "CPF", "Telefone"];

      const rows = data.map((cliente) => [
        cliente.id,
        cliente.nome,
        cliente.email,
        cliente.cpfOuCnpj,
        cliente.telefone,
      ]);

      doc.autoTable({
        head: [columns],
        body: rows,
        startY: 20,
        theme: "grid",
        tableWidth: "auto",
        margin: { top: 25 },
      });

      doc.save("RelatorioClientesNome.pdf");
    },
    async gerarRelatorioClientesEmail() {
      const clientes = await ClienteService.obterTodos();
      const doc = new jsPDF();

      doc.text("Relatório de Clientes por Email", 10, 10);

      const data = clientes.data.sort((a, b) => a.email.localeCompare(b.email));

      const columns = ["ID", "Nome", "Email", "CPF", "Telefone"];

      const rows = data.map((cliente) => [
        cliente.id,
        cliente.nome,
        cliente.email,
        cliente.cpfOuCnpj,
        cliente.telefone,
      ]);

      doc.autoTable({
        head: [columns],
        body: rows,
        startY: 20,
        theme: "grid",
        tableWidth: "auto",
        margin: { top: 25 },
      });

      doc.save("RelatorioClientesEmail.pdf");
    },
    async gerarRelatorioClientesCPF() {
      const clientes = await ClienteService.obterTodos();
      const doc = new jsPDF();

      doc.text("Relatório de Clientes por CPF", 10, 10);

      const data = clientes.data.sort((a, b) =>
        a.cpfOuCnpj.localeCompare(b.cpfOuCnpj)
      );

      const columns = ["ID", "Nome", "Email", "CPF", "Telefone"];

      const rows = data.map((cliente) => [
        cliente.id,
        cliente.nome,
        cliente.email,
        cliente.cpfOuCnpj,
        cliente.telefone,
      ]);

      doc.autoTable({
        head: [columns],
        body: rows,
        startY: 20,
        theme: "grid",
        tableWidth: "auto",
        margin: { top: 25 },
      });

      doc.save("RelatorioClientesCPF.pdf");
    },
    async gerarRelatorioClientesTelefone() {
      const clientes = await ClienteService.obterTodos();
      const doc = new jsPDF();

      doc.text("Relatório de Clientes por Telefone", 10, 10);

      const data = clientes.data.sort((a, b) =>
        a.telefone.localeCompare(b.telefone)
      );

      const columns = ["ID", "Nome", "Email", "CPF", "Telefone"];

      const rows = data.map((cliente) => [
        cliente.id,
        cliente.nome,
        cliente.email,
        cliente.cpfOuCnpj,
        cliente.telefone,
      ]);

      doc.autoTable({
        head: [columns],
        body: rows,
        startY: 20,
        theme: "grid",
        tableWidth: "auto",
        margin: { top: 25 },
      });

      doc.save("RelatorioClientesTelefone.pdf");
    },
  },
};
</script>
