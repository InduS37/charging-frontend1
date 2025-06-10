import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/LoginPage.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/dashboard', component: { template: '<h2>Dashboard</h2>' } }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
