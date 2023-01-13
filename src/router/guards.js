import { projectAuth } from '../firebase/config.js';
import useUserStore from '../stores/userStore.js';
import getUser from '../composables/getUser.js';

export const authGuard = (to, from, next) => {
    const currentUser = projectAuth.currentUser;
    if (!currentUser) next({ name: 'Login' });
    next();
};

export const logoutGuard = (to, from, next) => {
    const { user } = getUser();
    if (user.value) {
        next('/dashboard');
    }
    next();
};

export const flushData = (to, from, next) => {
    if (sessionStorage.getItem('state')) sessionStorage.removeItem('state');
    const userStore = useUserStore();
    userStore.$reset();
    next();
};

export const fetchUserData = async (to, from, next) => {
    const userStore = useUserStore();
    if (!userStore.getUserInfo.data) await userStore.fetchUserData();
    if (!userStore.getUserInfo.isLoading) next();
};

export const redirectToLogin = (to, from, next) => {
    const { user } = getUser();

    if (user.value) {
        next();
    }

    next({ name: 'Login' });
};
