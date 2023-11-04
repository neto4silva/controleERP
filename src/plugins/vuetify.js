import { createVuetify } from 'vuetify/framework';
import 'vuetify/dist/vuetify.min.css';
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  theme: {
    dark: false, 
  },
});

export default vuetify;