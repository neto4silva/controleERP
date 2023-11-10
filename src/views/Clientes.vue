<template>
  <div>
    <v-container>
      <h1 class="titulo">Clientes</h1>
      <v-divider class="mb-10 mt-4"></v-divider>
      <v-row class="mb-4" v-if="isMobile">
        <v-col>
          <v-row align="center">            
            <v-col>
              <Button value="Adicionar" :callback="abrirModalAdicao"></Button>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="text-right">
          <v-col class="text-right" >
            <v-btn @click="visualizarEmTabela" icon>
              <v-icon>mdi-table</v-icon>
            </v-btn>
          </v-col>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="cliente in clientes" :key="cliente.id" cols="12" md="3">
          <v-card class="mb-4" @click="abrirModalEdicao(cliente)">
            <img
              :src="imagemClienteUrl"
              alt="Imagem do Cliente"
              width="100%"
              style="max-height: 200px"
            />
            <v-card-title class="text-h5">{{ cliente.nome }} </v-card-title>
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
import ClienteMixin from "../mixins/cliente-mixin";
import Button from "../components/Button/Button.vue";

export default {
  name: "ClientesCard",
  components: {
    Button,
  },
  mixins: [ClienteMixin],
  data() {
    return {
      isMobile: false,
    };
  },
  mounted() {
    this.isMobile = window.innerWidth < 600;
    window.addEventListener('resize', this.verificarTamanhoDaTela);
  },
  methods: {
    verificarTamanhoDaTela() {
      this.isMobile = window.innerWidth < 600;
    },
    visualizarEmTabela() {
      this.$router.push("/controle-de-clientes");
    },    
  },
};
</script>
