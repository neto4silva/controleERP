<template>
  <div>
    <v-container>
      <h1>Clientes</h1>
      <v-divider class="mb-10 mt-4"></v-divider>
      <v-row class="mb-4">
        <v-col>
          <v-row align="center">
            <v-col>
              <Button value="Adicionar" :callback="abrirModalAdicao"></Button>
            </v-col>
            <v-col>
              <v-select
                v-model="filtro"
                :items="tiposFiltro"
                label="Filtrar por"
                hide-details
              ></v-select>
            </v-col>
            <v-col>
              <v-text-field
                v-model="pesquisa"
                label="Pesquisar cliente"
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="text-right">
          <v-col class="text-right">
            <v-btn @click="visualizarCards" icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-btn>
          </v-col>
        </v-col>
      </v-row>

      <v-data-table
        :items="clientesFiltrados"
        :headers="headers"
        item-key="id"
        @click:row="abrirModalEdicao"
        class="table-with-pointer"
        hide-default-footer
        :items-per-page="1000"
      >
        <!-- eslint-disable vue/valid-v-slot -->
        <template v-slot:item.dataCadastro="{ item }">
          {{ item.dataCadastro | data }}
        </template>
      </v-data-table>
    </v-container>

    <v-dialog v-model="modalAberto" max-width="600px">
      <v-card>
        <v-card-title v-if="!edicao">Adicionar Cliente</v-card-title>
        <v-card-title v-else>Editar Cliente</v-card-title>
        <v-card-text>
          <v-form
            @submit.prevent="edicao ? editarCliente() : adicionarCliente()"
          >
            <v-text-field
              v-model="cliente.nome"
              label="Nome do Cliente"
            ></v-text-field>
            <v-text-field
              v-model="cliente.cpfOuCnpj"
              label="CPF ou CNPJ"
            ></v-text-field>
            <v-text-field v-model="cliente.email" label="E-mail"></v-text-field>
            <v-text-field
              v-model="cliente.telefone"
              label="Telefone"
            ></v-text-field>
            <v-text-field
              v-model="cliente.idUsuario"
              label="ID do Usuário"
            ></v-text-field>
            <v-checkbox
              v-if="!edicao"
              v-model="manterAberto"
              label="Continuar adicionando"
            ></v-checkbox>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn v-if="edicao" @click="excluirCliente(cliente.id)" color="error"
            >Excluir</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn @click="modalAberto = manterAberto">Fechar</v-btn>
          <v-btn v-if="!edicao" @click="adicionarCliente" color="#2D4F6C" dark
            >Adicionar</v-btn
          >
          <v-btn v-else @click="editarCliente" color="#2D4F6C" dark
            >Editar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import clienteService from "@/services/cliente-service";
import Cliente from "@/models/cliente-model";
import conversorData from "@/utils/conversor-data";
import Button from "../components/Button.vue";

export default {
  name: "controleDeClientes",
  components: {
    Button,
  },
  filters: {
    data(data) {
      return conversorData.aplicarMascaraDataHoraEmDataIso(data);
    },
  },
  data() {
    return {
      clientes: [],
      pesquisa: "",
      filtro: "nome", 
      tiposFiltro: ["nome", "cpfOuCnpj", "email"], 
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
          text: "CPF/CNPJ",
          value: "cpfOuCnpj",
        },
        {
          text: "E-mail",
          value: "email",
        },
        {
          text: "Telefone",
          value: "telefone",
        },
        {
          text: "ID do Usuário",
          value: "idUsuario",
        },
        {
          text: "Data de Cadastro",
          value: "dataCadastro",
        },
      ],

      modalAberto: false,
      cliente: new Cliente(),
      edicao: false,
      manterAberto: false,
    };
  },

  created() {
    this.obterTodosOsClientes();
  },

  computed: {
    clientesFiltrados() {
      if (!this.pesquisa) {
        return this.clientes;
      }
      const pesquisaLowerCase = this.pesquisa.toLowerCase();
      return this.clientes.filter((cliente) =>
        cliente[this.filtro].toLowerCase().includes(pesquisaLowerCase)
      );
    },
  },

  methods: {
    abrirModalAdicao() {
      this.cliente = new Cliente();
      this.cliente.dataCadastro = new Date();
      this.edicao = false;
      this.manterAberto = false;
      this.modalAberto = true;
    },

    abrirModalEdicao(cliente) {
      this.cliente = new Cliente(cliente);
      this.edicao = true;
      this.modalAberto = true;
    },

    validarCliente(cliente) {
      return (
        cliente.nome &&
        cliente.email &&
        cliente.telefone &&
        cliente.cpfOuCnpj &&
        cliente.idUsuario
      );
    },

    async adicionarCliente() {
      if (this.validarCliente(this.cliente)) {
        try {
          await clienteService.cadastrar(this.cliente);
          this.cliente = new Cliente();
          this.obterTodosOsClientes();
          if (!this.manterAberto) {
            this.modalAberto = false;
          }
          this.$swal.fire(
            "Sucesso",
            "Cliente adicionado com sucesso",
            "success"
          );
        } catch (error) {
          console.error("Erro ao adicionar o cliente:", error);
          this.$swal.fire(
            "Erro",
            "Ocorreu um erro ao adicionar o cliente",
            "error"
          );
        }
      } else {
        this.$swal.fire(
          "Erro",
          "Por favor, preencha todos os campos obrigatórios",
          "error"
        );
      }
    },

    visualizarCards() {
      this.$router.push("/clientes");
    },

    async editarCliente() {
      try {
        await clienteService.atualizar(this.cliente);
        this.cliente = new Cliente();
        this.obterTodosOsClientes();
        if (!this.manterAberto) {
          this.modalAberto = false;
        }
        this.$swal.fire("Sucesso", "Cliente editado com sucesso", "success");
      } catch (error) {
        console.error("Erro ao editar o cliente:", error);
        this.$swal.fire("Erro", "Ocorreu um erro ao editar o cliente", "error");
      }
    },

    ordenarClientes(cliente, clientes) {
      return cliente.id < clientes.id ? -1 : cliente.id > clientes.id ? 1 : 0;
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

    excluirCliente(id) {
      this.$swal
        .fire({
          title: "Confirmar exclusão",
          text: "Deseja excluir este cliente?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sim, excluir",
          cancelButtonText: "Cancelar",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              await clienteService.deletar(id);
              this.obterTodosOsClientes();
              if (!this.manterAberto) {
                this.modalAberto = false;
              }
              this.$swal.fire(
                "Sucesso",
                "Cliente excluído com sucesso",
                "success"
              );
            } catch (error) {
              console.error("Erro ao excluir o cliente:", error);
              this.$swal.fire(
                "Erro",
                "Ocorreu um erro ao excluir o cliente",
                "error"
              );
            }
          }
        });
    },
  },
};
</script>

<style>
.table-with-pointer tbody tr:hover {
  cursor: pointer;
}
</style>
