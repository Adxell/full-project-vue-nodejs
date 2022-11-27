import MainVue from '@/components/Main.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', name: 'Home', component: MainVue },
    { path: '/character/:id', component: () => import('../components/Description.vue') },
]
export const router = createRouter({
    history: createWebHistory(),
    routes: routes
})