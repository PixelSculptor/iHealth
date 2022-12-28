import { ref } from 'vue';
import { projectFirestore } from '../firebase/config';

const useCollection = (collection) => {
    const error = ref(null);
    const isLoading = ref(false);

    const addDoc = async (doc) => {
        error.value = null;
        isLoading.value = false;

        try {
            isLoading.value = true;
            await projectFirestore.collection(collection).add(doc);
        } catch (err) {
            console.log(err.message);
            isLoading.value = false;
            error.value = 'could not return data, try again';
        }
    };

    return { error, addDoc, isLoading };
};

export default useCollection;
