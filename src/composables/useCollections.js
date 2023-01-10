import { ref } from 'vue';
import { projectFirestore, projectAuth } from '../firebase/config';

const useCollection = (collection) => {
    const user = projectAuth.currentUser;
    const error = ref(null);
    const isLoading = ref(false);

    const addDoc = async (doc) => {
        error.value = null;
        isLoading.value = false;

        try {
            isLoading.value = true;
            await projectFirestore
                .collection(collection)
                .where('userId', '==', user.uid)
                .add(doc);
        } catch (err) {
            console.log(err.message);
            isLoading.value = false;
            error.value = 'could not return data, try again';
        }
    };

    return { error, addDoc, isLoading };
};

export default useCollection;
