import DashboardLayout from '../src/pages/Layout/DashboardLayout.vue';
// GeneralViews
import NotFound from '../src/pages/GeneralViews/NotFoundPage.vue';
import Dashboard from "../src/pages/Dashboard/Dashboard";
import Questionnaire from "../src/pages/GeneralViews/Questionnaire";
import Signup from "../src/pages/GeneralViews/SignUp";
import Signin from "../src/pages/GeneralViews/SignIn";
import profile from "../src/pages/GeneralViews/profile";
import table from "../src/pages/GeneralViews/table";

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
        path: '/profile',
        name: 'profile',
        components: { default: profile }
      },{
        path: '/questionnaire',
        component: Questionnaire,
        name: 'questionnaire'
      },{
        path: '/table',
        component: table,
        name: 'table'
      }
    ]
  },

  { path: '*', component: NotFound }
];

export default routes;
