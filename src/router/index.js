import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../view/HomeView.vue';
import SignUpView from '../view/auth/SignUpView.vue';
import LoginView from '../view/auth/LoginView.vue';
import { authGuard } from './guards.js';
import ProfileView from '../view/ProfileView.vue';
import PrescriptionView from '../view/PrescriptionView.vue';
import ReferralsView from '../view/ReferralsView.vue';
import VisitsView from '../view/VisitsView.vue';
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
        {
            path: '/profile',
            name: 'Profile',
            component: ProfileView,
        },
        {
            path: '/prescriptions',
            name: 'Prescriptions',
            component: PrescriptionView,
        },
        {
            path: '/referral',
            name: 'Referrals',
            component: ReferralsView,
        },
        {
            path: '/visit',
            name: 'Visits',
            component: VisitsView,
        },
    ],
});

export default router;
