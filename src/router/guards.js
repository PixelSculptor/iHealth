import { projectAuth } from '../firebase/config.js';

export const authGuard = (to, from, next) => {
    const currentUser = projectAuth.currentUser;
    console.log(currentUser);
    if (!currentUser) next({ name: 'Login' });
    else next();
};
