import { projectAuth } from '../firebase/config.js';
import getUser from '../composables/getUser.js';
import useLogout from '../composables/useLogout.js';
import useUserStore from '../stores/userStore.js';

export const authGuard = (to, from, next) => {
    const currentUser = projectAuth.currentUser;
    if (!currentUser) next({ name: 'Login' });
    else next();
};

export const logoutGuard = async (to, from, next) => {
    const user = getUser();
    const { logout } = useLogout();
    if (user) {
        await logout();
        next();
    }
};

export const fetchUserData = (to, from, next) => {
    const userStore = useUserStore();
    userStore.fetchUserData();
    if (!userStore.getUserInfo.isLoading) next();
};
