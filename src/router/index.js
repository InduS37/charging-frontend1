import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import DashboardPage from '../components/DashboardPage.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/dashboard', component: DashboardPage }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
