import firebase from 'firebase/app';
import router from '../router/index.js';
const facebookLogInSite = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            const credential = result.credential;
            console.log('User credentials: ', credential);
            router.push({ name: 'Home' });
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log('Error on facebook login: ', errorMessage);
        });
};

export default facebookLogInSite;
