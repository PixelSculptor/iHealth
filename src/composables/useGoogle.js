import firebase from 'firebase/app';

const googleSign = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            console.log(result.user);
        })
        .catch((err) => {
            console.log(err.message);
            err.value = err.message;
        });
};

export default googleSign;