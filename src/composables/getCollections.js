import { ref } from 'vue';
import { projectAuth, projectFirestore } from '../firebase/config';

const getCollections = (collection) => {
    const documents = ref(null);
    const error = ref(null);
    const user = projectAuth.currentUser;

    const collectionRef = projectFirestore
        .collection(collection)
        .where('userId', '==', user.uid);

    collectionRef.onSnapshot(
        (snap) => {
            documents.value = snap.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            });
            error.value = null;
        },
        (err) => {
            error.value = 'could not fetch data';
            console.log(err.message);
            documents.value = null;
        }
    );

    return { documents, error };
};

export default getCollections;
