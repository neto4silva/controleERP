import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import moment from "moment-timezone";
import 'jest-canvas-mock';

moment.tz.setDefault("America/Sao_Paulo"); 
moment.locale("pt-br");

Vue.use(Vuetify);

const vuetify = new Vuetify();
Vue.config.productionTip = false;
Vue.config.devtools = false;

global.localVue = Vue;
global.vuetify = vuetify;
