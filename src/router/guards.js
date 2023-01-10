import { projectAuth } from '../firebase/config.js';
import useUserStore from '../stores/userStore.js';

export const authGuard = (to, from, next) => {
    const currentUser = projectAuth.currentUser;
    if (!currentUser) next({ name: 'Login' });
    next();
};

export const logoutGuard = (to, from, next) => {
    const user = projectAuth.currentUser;
    console.log(user);
    if (user) {
        next('/dashboard');
    }
    next();
};

// TODO: fix this routeguard
export const flushData = (to, from, next) => {
    if (sessionStorage.getItem('state')) sessionStorage.removeItem('state');
    const userStore = useUserStore();
    userStore.$reset();
    next();
};

export const fetchUserData = (to, from, next) => {
    const userStore = useUserStore();
    userStore.fetchUserData();
    if (!userStore.getUserInfo.isLoading) next();
};
