import firebase from 'firebase/app';
import router from '../router/index.js';

const googleLogInSite = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            console.log(result.user);
            router.push({ name: 'Home' });
        })
        .catch((err) => {
            console.log(err.message);
            err.value = err.message;
        });
};

export default googleLogInSite;
