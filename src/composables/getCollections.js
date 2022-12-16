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
            const results = [];
            snap.docs.map((doc) => {
                return (
                    doc.data().createdAt &&
                    results.push({ ...doc.data(), id: doc.id })
                );
            });
            documents.value = results;
            error.value = null;
        },
        (err) => {
            console.log(err.message);
            documents.value = null;
            error.value = 'Could not fetch data, try again or search error';
        }
    );

    return { documents, error };
};

export default getCollection;
