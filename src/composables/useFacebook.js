import firebase from 'firebase/app';
import router from '../router/index.js';

const facebookSign = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            console.log(result.user);
            router.push('/create');
        })
        .catch((err) => {
            console.log(err.message);
            err.value = err.message;
        });
};

export default facebookSign;
