import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import VueScreen from 'vue-screen';
import DashboardPlugin from './plugins/dashboard-plugin';
import Vuelidate from 'vuelidate';
import VueGoogleCharts from 'vue-google-charts';


//use googlecharts
Vue.use(VueGoogleCharts);
// plugin setup
Vue.use(DashboardPlugin);
// router setup
import router from '../routes/router';
// plugin setup
Vue.use(VueRouter);
// Bootstrap
Vue.use(VueScreen, 'bootstrap');
//vuelidate
Vue.use(Vuelidate);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
});
