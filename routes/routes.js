import DashboardLayout from '../src/pages/Layout/DashboardLayout.vue';
// GeneralViews
import NotFound from '../src/pages/GeneralViews/NotFoundPage.vue';
import Dashboard from "../src/pages/Dashboard/Dashboard";
import Questionnaire from "../src/Modals/Questionnaire";
import { QuestionPanelDynamicTemplateSurveyImpl } from 'survey-vue';

const routes = [
  {
    path: '/questionnaire',
    component: Questionnaire,
    redirect: '/questionnaire',
    name: 'Questionnaire'
  },
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
