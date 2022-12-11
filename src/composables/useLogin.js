import { projectAuth } from '../firebase/config.js';
import { ref } from 'vue';
const error = ref(null);
const signIn = async (email, password) => {
    error.value = null;
    try {
        const response = await projectAuth.signInWithEmailAndPassword(
            email,
            password
        );
        if (!response) throw new Error('Cannot log in!');
        error.value = null;
        return response;
    } catch (err) {
        console.log(err.message);
        error.value = err.message;
    }
};

const useLogin = () => {
    return { error, signIn };
};

export default useLogin;
