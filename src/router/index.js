import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '../view/WelcomeView.vue';
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Welcome',
            component: WelcomeView,
        },
    ],
});

export default router;
