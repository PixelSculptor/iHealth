import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../view/HomeView.vue';
import SignUpView from '../view/auth/SignUpView.vue';
import LoginView from '../view/auth/LoginView.vue';
import { authGuard } from './guards.js';
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView,
            beforeEnter: authGuard,
        },
        {
            path: '/register',
            name: 'Signup',
            component: SignUpView,
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginView,
        },
    ],
});

export default router;
