import { ref } from 'vue';
import { projectAuth, projectFirestore } from '../firebase/config';

const getDocument = async (collection) => {
    const user = projectAuth.currentUser;
    const document = ref(null);
    const error = ref(null);
    const id = ref(0);

    const documentRef = await projectFirestore
        .collection(collection)
        .where('userId', '==', user.uid)
        .limit(1);

    await documentRef.onSnapshot(
        (snap) => {
            document.value = snap.docs.map((doc) => {
                console.log(doc.data(), doc.id);
                id.value = doc.id;
                return { ...doc.data(), id: doc.id };
            });
            error.value = null;
        },
        (err) => {
            error.value = 'could not fetch data';
            console.log(err.message);
            document.value = null;
            id.value = 0;
        }
    );
    return { document, error, id };
};

export default getDocument;
