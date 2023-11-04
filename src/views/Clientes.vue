<template>
  <div>
    <v-container>
      <h1>Clientes</h1>
      <v-divider class="mb-4"></v-divider>
      <v-row>
        <v-col v-for="cliente in clientes" :key="cliente.id" cols="12" md="3">
          <v-card class="mb-4" @click="abrirModalEdicao(cliente)">
            <img :src="imagemClienteUrl" alt="Imagem do Cliente" width="100%" />
            <v-card-title class="text-h5"
              >{{ cliente.nome }}
              <v-chip
                v-if="temCamposEmBranco(cliente)"
                color="red"
                text-color="white"
                class="ml-4"
              >
                Campos em branco
              </v-chip></v-card-title
            >
            <v-card-text>
              <div><strong>Email:</strong> {{ cliente.email }}</div>
              <div><strong>Telefone:</strong> {{ cliente.telefone }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
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
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn v-if="edicao" @click="excluirCliente(cliente.id)" color="error"
            >Excluir</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn @click="modalAberto = false">Fechar</v-btn>
          <v-btn v-if="!edicao" @click="adicionarCliente()" color="primary"
            >Adicionar</v-btn
          >
          <v-btn v-else @click="editarCliente()" color="primary">Editar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import clienteService from "@/services/cliente-service";
import Cliente from "@/models/cliente-model";
import conversorData from "@/utils/conversor-data";

export default {
  name: "ControleDeClientes",
  filters: {
    data(data) {
      return conversorData.aplicarMascaraDataHoraEmDataIso(data);
    },
  },
  data() {
    return {
      clientes: [],
      modalAberto: false,
      cliente: new Cliente(),
      edicao: false,
      imagemClienteUrl: "https://via.placeholder.com/100",
    };
  },

  created() {
    this.obterTodosOsClientes();
  },

  methods: {
    abrirModalAdicao() {
      this.cliente = new Cliente();
      this.edicao = false;
      this.modalAberto = true;
    },

    abrirModalEdicao(cliente) {
      this.cliente = new Cliente(cliente);
      this.edicao = true;
      this.modalAberto = true;
    },

    adicionarCliente() {
      clienteService
        .cadastrar(this.cliente)
        .then(() => {
          this.cliente = new Cliente();
          this.obterTodosOsClientes();
          this.modalAberto = false;
        })
        .catch((error) => {
          console.error("Erro ao adicionar o cliente:", error);
        });
    },

    editarCliente() {
      clienteService
        .atualizar(this.cliente)
        .then(() => {
          this.cliente = new Cliente();
          this.obterTodosOsClientes();
          this.modalAberto = false;
        })
        .catch((error) => {
          console.error("Erro ao editar o cliente:", error);
        });
    },

    obterTodosOsClientes() {
      clienteService
        .obterTodos()
        .then((response) => {
          this.clientes = response.data.map((c) => new Cliente(c));
        })
        .catch((error) => {
          console.log(error);
        });
    },

    temCamposEmBranco(cliente) {
      return (
        !cliente.nome ||
        !cliente.email ||
        !cliente.telefone ||
        !cliente.cpfOuCnpj ||
        !cliente.idUsuario
      );
    },

    excluirCliente(id) {
      if (confirm("Deseja excluir este cliente?")) {
        clienteService
          .deletar(id)
          .then(() => {
            this.obterTodosOsClientes();
            this.modalAberto = false;
          })
          .catch((error) => {
            console.error("Erro ao excluir o cliente:", error);
          });
      }
    },
  },
};
</script>
