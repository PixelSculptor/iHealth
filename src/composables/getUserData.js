import { ref } from 'vue';
import { projectFirestore } from '../firebase/config.js';

const getUserData = (collection, userId) => {
    const documents = ref(null);
    const error = ref(null);

    const collectionRef = projectFirestore
        .collection(collection)
        .where('userId', '==', userId);

    collectionRef.onSnapshot(
        (snap) => {
            documents.value = snap.docs.map((doc) => {
                return doc.data().createdAt && { ...doc.data(), id: doc.id };
            });
            console.log(documents.value);
            error.value = null;
        },
        (err) => {
            console.log(err.message);
            documents.value = null;
            error.value = 'could not fetch data';
        }
    );

    return { documents, error };
};

export default getUserData;
