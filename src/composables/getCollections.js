import { ref } from 'vue';
import { projectFirestore, projectAuth } from '../firebase/config';

const getCollections = (collection) => {
    const user = projectAuth.currentUser;
    const documents = ref(null);
    const error = ref(null);

    const collectionRef = projectFirestore
        .collection(collection)
        .where('userId', '==', user.uid);

    console.log(collectionRef);

    collectionRef.onSnapshot(
        (snap) => {
            documents.value = snap.docs.map((doc) => {
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
