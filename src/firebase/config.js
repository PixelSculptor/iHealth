import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyBm6Y9sQlwOeCxyVqy4dSQ1nGBF61SJLbI',
    authDomain: 'ihealth-engineer.firebaseapp.com',
    projectId: 'ihealth-engineer',
    storageBucket: 'ihealth-engineer.appspot.com',
    messagingSenderId: '270633551876',
    appId: '1:270633551876:web:eb3876f5a1a213d1818d51',
};

// init firebase
firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

export { projectFirestore, timestamp, projectAuth, projectStorage };
