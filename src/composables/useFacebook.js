import firebase from 'firebase/app';

const facebookSign = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
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

export default facebookSign;