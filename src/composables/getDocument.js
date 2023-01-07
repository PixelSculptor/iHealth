import { ref } from 'vue';
import { projectFirestore, projectAuth } from '../firebase/config';

const getDocument = (collection) => {
    const user = projectAuth.currentUser;
    const document = ref(null);
    const error = ref(null);

    const collectionRef = projectFirestore
        .collection(collection)
        .where('userId', '==', user.uid)
        .limit(1);

    collectionRef.onSnapshot(
        (snap) => {
            document.value = snap.docs.map((doc) => {
                console.log('userId: ', doc.data(), 'id: ', doc.id);
                return { ...doc.data(), id: doc.id };
            });
            console.log(document);

            error.value = null;
        },
        (err) => {
            error.value = 'could not fetch data';
            console.log(err.message);
            document.value = null;
        }
    );
    console.log('dokumenty:', document);
    return { document, error };
};

export default getDocument;
