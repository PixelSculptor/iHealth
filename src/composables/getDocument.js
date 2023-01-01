import { ref } from 'vue';
import { projectFirestore, projectAuth } from '../firebase/config';

const getDocument = (collection, uid) => {
    const document = ref(null);
    const error = ref(null);

    const documentRef = projectFirestore.collection(collection).user(uid);

    projectAuth.onAuthStateChanged((user) => {
        if (user) {
            documentRef.onSnapshot(
                (doc) => {
                    if (doc.data()) {
                        document.value = { ...doc.data(), uid: user.uid };
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
            console.log(user.uid);
        } else {
            error.value = 'user is not logged in';
        }
    });

    return { document, error };
};

export default getDocument;
