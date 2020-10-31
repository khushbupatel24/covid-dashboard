import DashboardLayout from '../src/pages/Layout/DashboardLayout.vue';
// GeneralViews
import NotFound from '../src/pages/GeneralViews/NotFoundPage.vue';
import Dashboard from "../src/pages/Dashboard/Dashboard";

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Home'
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
      },
    ]
  },
  { path: '*', component: NotFound }
];

export default routes;
