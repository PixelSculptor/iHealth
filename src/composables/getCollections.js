import { ref } from 'vue';
import { projectFirestore } from '../firebase/config';

const getCollection = (collection) => {
    const documents = ref(null);
    const error = ref(null);

    const collectionRef = projectFirestore
        .collection(collection)
        .orderBy('createdAt');

    collectionRef.onSnapshot(
        (snap) => {
            const results = snap.docs.map((doc) => {
                return doc.data().createdAt && { ...doc.data(), id: doc.id };
            });
            documents.value = results;
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

export default getCollection;
