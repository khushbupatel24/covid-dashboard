import DashboardLayout from '../src/pages/Layout/DashboardLayout.vue';
// GeneralViews
import NotFound from '../src/pages/GeneralViews/NotFoundPage.vue';
import Dashboard from "../src/pages/Dashboard/Dashboard";
import Questionnaire from "../src/pages/GeneralViews/Questionnaire";
import Signup from "../src/pages/GeneralViews/SignUp";
import Signin from "../src/pages/GeneralViews/Signin";

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    name: 'dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        components: { default: Dashboard }
      },{
        path: 'signup',
        name: 'signup',
        components: { default: Signup }
      },{
        path: '/Signin',
        name: 'Signin',
        components: { default: Signin }
      },{
        path: '/questionnaire',
        component: Questionnaire,
        name: 'questionnaire'
      }
    ]
  },

  { path: '*', component: NotFound }
];

export default routes;
