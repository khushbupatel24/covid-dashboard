import DashboardLayout from '../src/pages/Layout/DashboardLayout.vue';
// GeneralViews
import NotFound from '../src/pages/GeneralViews/NotFoundPage.vue';
import Dashboard from "../src/pages/Dashboard/Dashboard";
import Questionnaire from "../src/Modals/Questionnaire";
import Signup from "../src/pages/GeneralViews/SignUp";

const routes = [
  {
    path: '/questionnaire',
    component: Questionnaire,
    name: 'Questionnaire'
  },
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    name: 'Dashboard layout',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        components: { default: Dashboard }
      },{
        path: 'signup',
        name: 'signup',
        components: { default: Signup }
      },
    ]
  },

  { path: '*', component: NotFound }
];

export default routes;
