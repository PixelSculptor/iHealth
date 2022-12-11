import { projectAuth } from '../firebase/config.js';
import { ref } from 'vue';

const error = ref(null);

const logout = async () => {
    error.value = null;
    try {
        await projectAuth.signOut();
        error.value = null;
    } catch (err) {
        console.log(err.message);
        error.value = err.message;
    }
};

const useLogout = () => {
    return { error, logout };
};

export default useLogout;
