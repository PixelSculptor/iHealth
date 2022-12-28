import { projectAuth } from '../firebase/config.js';
import { ref } from 'vue';
const error = ref(null);
const isLoading = ref(false);

const signIn = async (email, password) => {
    error.value = null;
    isLoading.value = false;
    try {
        isLoading.value = true;
        const response = await projectAuth.signInWithEmailAndPassword(
            email,
            password
        );
        if (!response) throw new Error('Cannot log in!');
        isLoading.value = false;
        error.value = null;
        return response;
    } catch (err) {
        console.log(err.message);
        error.value = err.message;
    }
};

const useLogin = () => {
    return { error, signIn, isLoading };
};

export default useLogin;
