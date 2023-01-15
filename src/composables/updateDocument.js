import { projectFirestore } from '../firebase/config.js';
import { ref } from 'vue';

export const useUpdateDocument = (collection) => {
    const isLoading = ref(false);
    const error = ref('');

    const updateDoc = async (docId, userData) => {
        error.value = '';
        isLoading.value = false;
        try {
            isLoading.value = true;
            await projectFirestore
                .collection(collection)
                .doc(docId)
                .update(userData);
        } catch (err) {
            error.value = err.message;
            console.log(error.value);
        } finally {
            isLoading.value = false;
        }
    };

    return { isLoading, error, updateDoc };
};
