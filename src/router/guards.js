import { projectAuth } from '../firebase/config.js';
import getUser from '../composables/getUser.js';
import useLogout from '../composables/useLogout.js';

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
