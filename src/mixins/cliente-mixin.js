import clienteService from "@/services/cliente-service";
import Cliente from "@/models/cliente-model";
import conversorData from "@/utils/conversor-data";

let ClienteMixin = {
  filters: {
    data(data) {
      return conversorData.aplicarMascaraDataHoraEmDataIso(data);
    },
  },
  data() {
    return {
      clientes: [],
      pesquisa: "",
      filtro: "Nome",
      tiposFiltro: ["Nome", "CPF/CNPJ", "E-mail"],
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
      imagemClienteUrl: "https://via.placeholder.com/700",
    };
  },
  mounted() {
    this.obterTodosOsClientes();
  },
  computed: {
    clientesFiltrados() {
      if (!this.pesquisa) {
        return this.clientes;
      }

      const pesquisaLowerCase = this.pesquisa.toLowerCase();

      return this.clientes.filter((cliente) => {
        let valorFiltro = "";

        switch (this.filtro) {
          case "Nome":
            valorFiltro = cliente.nome.toLowerCase();
            break;
          case "CPF/CNPJ":
            valorFiltro = cliente.cpfOuCnpj.toLowerCase();
            break;
          case "E-mail":
            valorFiltro = cliente.email.toLowerCase();
            break;
          default:
            break;
        }

        return valorFiltro.includes(pesquisaLowerCase);
      });
    },
  },
  methods: {
    abrirModalAdicao() {
      this.cliente = new Cliente({
        dataCadastro: new Date(),
      });
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

    adicionarCliente() {
      if (this.validarCliente(this.cliente)) {
        clienteService
          .cadastrar(this.cliente)
          .then(() => {
            this.cliente = new Cliente();
            this.obterTodosOsClientes();
            if (!this.manterAberto) {
              this.modalAberto = false;
            }
            this.$swal.fire({
              position: "center",
              icon: "success",
              title: "Cliente cadastrado com sucesso",
              showConfirmButton: false,
              timer: 1000,
            });
          })
          .catch((error) => {
            console.error("Erro ao adicionar o cliente:", error);
            this.$swal.fire(
              "Erro",
              "Ocorreu um erro ao adicionar o cliente",
              "error"
            );
          });
      } else {
        this.$swal.fire(
          "Erro",
          "Por favor, preencha todos os campos obrigatórios",
          "error"
        );
      }
    },

    editarCliente() {
      clienteService
        .atualizar(this.cliente)
        .then(() => {
          this.cliente = new Cliente();
          this.obterTodosOsClientes();
          if (!this.manterAberto) {
            this.modalAberto = false;
          }
          this.$swal.fire({
            position: "center",
            icon: "success",
            title: "Cliente atualizado com sucesso",
            showConfirmButton: false,
            timer: 1000,
          });
        })
        .catch((error) => {
          console.error("Erro ao editar o cliente:", error);
          this.$swal.fire(
            "Erro",
            "Ocorreu um erro ao editar o cliente",
            "error"
          );
        });
    },

    ordenarClientes(cliente, clientes) {
      return cliente.id < clientes.id ? -1 : cliente.id > clientes.id ? 1 : 0;
    },

    obterTodosOsClientes() {
      clienteService
        .obterTodos()
        .then((response) => {
          let clientes = response.data.map((c) => new Cliente(c));
          this.clientes = clientes.sort(this.ordenarClientes).reverse();
        })
        .catch((error) => {
          console.log(error);
          this.$swal.fire(
            "Erro",
            "Ocorreu um erro ao obter os clientes",
            "error"
          );
        });
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
          confirmButtonColor: "#2D4F6C",
        })
        .then((result) => {
          if (result.isConfirmed) {
            clienteService
              .deletar(id)
              .then(() => {
                this.obterTodosOsClientes();
                if (!this.manterAberto) {
                  this.modalAberto = false;
                }
                this.$swal.fire(
                  "Sucesso",
                  "Cliente excluído com sucesso",
                  "success"
                );
              })
              .catch((error) => {
                console.error("Erro ao excluir o cliente:", error);
                this.$swal.fire(
                  "Erro",
                  "Ocorreu um erro ao excluir o cliente",
                  "error"
                );
              });
          }
        });
    },
  },
};

export default ClienteMixin;
