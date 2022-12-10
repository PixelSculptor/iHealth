import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '../view/WelcomeView.vue';
import LoginView from '../view/auth/LoginView.vue';
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Welcome',
            component: WelcomeView,
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginView,
        },
    ],
});

export default router;
