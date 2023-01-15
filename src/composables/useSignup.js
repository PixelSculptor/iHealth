import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

const error = ref(null);
const isLoading = ref(false);

const signup = async (email, password) => {
    error.value = null;
    isLoading.value = false;

    try {
        isLoading.value = true;
        const res = await projectAuth.createUserWithEmailAndPassword(
            email,
            password
        );
        if (!res) {
            throw new Error('Could not complete the signup!');
        }
        isLoading.value = false;
        console.log(res.user);
        error.value = null;
        return res;
    } catch (err) {
        console.log(err.message);
        error.value = err.message;
        isLoading.value = false;
    }
};

const useSignup = () => {
    return { error, signup, isLoading };
};

export default useSignup;
