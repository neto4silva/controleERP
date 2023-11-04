<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card>
          <v-img
            class="align-end text-white"
            src="https://images.pexels.com/photos/16842379/pexels-photo-16842379/free-photo-of-fotografia-aerea-aerofotografia-baia-doca.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            cover
          >
          <v-card-title class="custom-title-color">Título do Card</v-card-title>
          </v-img>
          <v-card-text>
            <div>Rio vermelho</div>
            <div>Loram Impsun ápsdioasodi ásidnaso dasoidn</div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn to="/controle-de-clientes" color="error">
              <v-icon left>
                mdi-delete
              </v-icon>
              Excluir
            </v-btn>
            <v-btn to="/" color="primary">
              <v-icon left>
                mdi-pencil
              </v-icon>
              Editar
            </v-btn>            
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "MainCards",

  data: () => ({
    //
  }),
};
</script>


<style scoped>
.custom-title-color {
  color: #fff; 
}
</style>