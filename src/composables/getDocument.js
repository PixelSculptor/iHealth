import { ref } from 'vue';
import { projectFirestore } from '../firebase/config';

const getDocument = (collection, id) => {
    const document = ref(null);
    const error = ref(null);

    const documentRef = projectFirestore.collection(collection).doc(id);

    documentRef.onSnapshot(
        (doc) => {
            if (doc.data()) {
                document.value = { ...doc.data(), id: doc.id };
                error.value = null;
            } else {
                error.value = 'that document not exist';
            }
        },
        (err) => {
            console.log(err.message);
            error.value = 'could not fetch documents ';
        }
    );

    return { document, error };
};

export default getDocument;
