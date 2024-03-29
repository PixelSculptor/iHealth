import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../view/HomeView.vue';
import SignUpView from '../view/auth/SignUpView.vue';
import LoginView from '../view/auth/LoginView.vue';
import CompleteRegistrationView from '../view/auth/CompleteRegistrationView.vue';

import {
    authGuard,
    flushData,
    logoutGuard,
    redirectToLogin,
} from './guards.js';
import ProfileView from '../view/ProfileView.vue';
import PrescriptionView from '../view/PrescriptionView.vue';
import ReferralsView from '../view/ReferralsView.vue';
import VisitsView from '../view/VisitsView.vue';
import App from '../App.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'App',
            component: App,
            beforeEnter: [redirectToLogin, flushData],
        },
        {
            path: '/dashboard',
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
            beforeEnter: [logoutGuard],
        },
        {
            path: '/profile',
            name: 'Profile',
            component: ProfileView,
            beforeEnter: authGuard,
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
        {
            path: '/create',
            name: 'CompleteProfile',
            component: CompleteRegistrationView,
        },
    ],
});

export default router;
