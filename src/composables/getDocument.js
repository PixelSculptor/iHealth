import { ref } from 'vue';
import { projectFirestore, projectAuth } from '../firebase/config';

const getDocument = (collection) => {
    const user = projectAuth.currentUser;
    const document = ref(null);
    const error = ref(null);

    const documentRef = projectFirestore
        .collection(collection)
        .where('userId', '==', user.uid)
        .limit(1);

    documentRef.onSnapshot(
        (snap) => {
            document.value = snap.docs.map((doc) => {
                console.log('DOCuserId: ', doc.data(), 'DOCid: ', doc.id);
                return { ...doc.data(), id: doc.id };
            });
            console.log(document.value[0]);

            error.value = null;
        },
        (err) => {
            error.value = 'could not fetch data';
            console.log(err.message);
            document.value = null;
        }
    );
    return { document, error };
};

export default getDocument;
