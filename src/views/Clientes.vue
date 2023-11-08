<template>
  <div>
    <v-container>
      <h1 class="titulo">Clientes</h1>
      <v-divider class="mb-4"></v-divider>
      <v-row>
        <v-col v-for="cliente in clientes" :key="cliente.id" cols="12" md="3">
          <v-card class="mb-4" @click="abrirModalEdicao(cliente)">
            <img
              :src="imagemClienteUrl"
              alt="Imagem do Cliente"
              width="100%"
              style="max-height: 200px"
            />
            <v-card-title class="text-h5"
              >{{ cliente.nome }}
            </v-card-title>
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
              class="nome-input"
            ></v-text-field>
            <v-text-field
              v-model="cliente.cpfOuCnpj"
              label="CPF ou CNPJ"
            ></v-text-field>
            <v-text-field v-model="cliente.email" label="E-mail" class="email-input"></v-text-field>
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
          <v-btn v-if="edicao" @click="excluirCliente(cliente.id)" color="error" class="excluir-button"
            >Excluir</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn @click="modalAberto = false" class="cancel-button">Fechar</v-btn>
          <v-btn v-if="!edicao" @click="adicionarCliente()" color="primary" class="save-button"
            >Adicionar</v-btn
          >
          <v-btn v-else @click="editarCliente()" color="primary" class="save-button">Editar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ClienteMixin from '../mixins/cliente-mixin';

export default {
  name: "ClientesCard",
  mixins: [ClienteMixin],
};
</script>
