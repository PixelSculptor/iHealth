import { ref } from 'vue';
import { projectFirestore, projectAuth } from '../firebase/config';

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
                console.log(doc.data(), doc.id);
                return { ...doc.data(), id: doc.id };
            });
            console.log(documents);
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
