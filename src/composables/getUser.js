import { projectAuth } from '../firebase/config.js';
import { ref } from 'vue';

const user = ref(projectAuth.currentUser);
projectAuth.onAuthStateChanged((_user) => {
    console.log(`Auth state has changed! current user is: `, _user);
    user.value = _user;
});
const getUser = () => {
    return { user };
};
export default getUser;
