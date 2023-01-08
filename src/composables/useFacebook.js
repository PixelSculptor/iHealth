import firebase from 'firebase/app';
import router from '../router/index.js';
const facebookSign = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            const credential = result.credential;
            const user = result.user;
            console.log('user: ', user);
            const accessToken = credential.accessToken;
            console.log(result.user, accessToken);
            router.push('/create');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
            console.log('Error on facebook login');
            console.log(errorCode, errorMessage, email, credential);
        });
};

export default facebookSign;
