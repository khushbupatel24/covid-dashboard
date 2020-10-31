
// A plugin file where you could register global components used across the app
import GlobalComponents from './globalComponents';

// asset imports
import '../../src/assets/sass/black-dashboard-pro.scss';
/*
import '../../src/assets/css/nucleo-icons.css';
*/
import '../../src/assets/css/demo.css';

export default {
  install(Vue) {
    Vue.use(GlobalComponents);
//    Vue.use(RTLPlugin);
//    Vue.use(SideBar);
/*
    Vue.use(Notifications);
    Vue.use(VeeValidate, { fieldsBagName: 'veeFields' });
*/
  }
};
