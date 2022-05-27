import './sass/main.scss'

import { initializeApp 
    } from 'firebase/app';


import { getAuth, 
  onAuthStateChanged,
  createUserWithEmailAndPassword ,
  signOut, signInWithEmailAndPassword
  } from 'firebase/auth';

import {
      getFirestore , collection, onSnapshot,
      addDoc, doc, deleteDoc,
      query, where,
      orderBy, serverTimestamp,
      getDoc } 
      from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAdF4a9OeqDlUCSIhPRZQN-bNSErnpiDwg",
  authDomain: "ihealth-app.firebaseapp.com",
  projectId: "ihealth-app",
  storageBucket: "ihealth-app.appspot.com",
  messagingSenderId: "1036603977860",
  appId: "1:1036603977860:web:cff6f3ed6985003b9852d1",
  measurementId: "G-J91W58WPHR"
};
initializeApp(firebaseConfig);

document.querySelector('#app').innerHTML = `

  <h1>Hello Vite!</h1>
  <h2>Add User in Firebase</h2>
  <form class="signup">
  <p>
  <label for="email"> Email:  </label>
  <input type="email" id="emails" name="email" required /> </p>
  <p>
  <label for="password"> Password: </label>
  <input type="password" id="passwords" name="password" required />
  </p>
  <p>
  <input type="submit" value="Add  user"/>
  </p>

  </form>

  <h2> Login </h2>
  <form class="login">
  <p>
    <label for="email"> Email:  </label>
    <input type="email" id="emailP" name="email" required /> </p>
    <p>
    <label for="password"> Password: </label>
    <input type="password" id="passwordP" name="password" required />
    <p>
    <input type="submit" value="Login"/>
    </form>

    <h2>Logout</h2>
    <input type="submit" class="logout" value="Logout"/>
    <p>

    <h2>Unsubscribing</h2>
    <input type="submit" class="unsub" value="Unsubscribe from db/auth chancges"/>


  <h2>Deal with Documents</h2>
  <form class="add">
  <p>
  <label for="name"> Name:  </label>
  <input type="name" id="name" name="name"/> </p>
  </p>
  <p>
    <label for="email"> Email:  </label>
    <input type="email" id="email" name="email" required /> </p>
    <p>
    <label for="password"> Password: </label>
    <input type="password" id="password" name="password" required />
    </p>
    <p>
    <input type="submit" value="Add document"/>
    </p>
  </form>

 

  <form class="delete">
  <p>
  <label for="id"> User ID: </label>
  <input type="text" name="id" required /> 
  </p>
  <p>
  <button>Delete document</button>
  </p>

  </form>

  

  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
  `



  const db = getFirestore();
  const auth = getAuth();

  // collection reference
  const colRef = collection(db, 'users');

  //queries
  const q = query(colRef, orderBy('createdAt'));
  
  //real time collection data
  const unsubCol = onSnapshot(q, (snapshot) => {
    let users = []
    snapshot.docs.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id })
    })
    console.log(users)
  });
  
    

  //adding documents
const addUserForm = document.querySelector('.add');
if(addUserForm){
addUserForm.addEventListener('submit', (e) => {
   e.preventDefault()
  
   addDoc(colRef, {
    name: addUserForm.name.value,
    email: addUserForm.email.value,
    password: addUserForm.password.value,
    createdAt: serverTimestamp()
  })
  .then(() =>{
    addUserForm.reset()
  }
)
 })};

 //deleting documents
 const deleteUserForm = document.querySelector('.delete')
 deleteUserForm.addEventListener('submit', (e) => {
   e.preventDefault();

   const docRef = doc(db, 'users', deleteUserForm.id.value)

   deleteDoc(docRef).then(() => {
     deleteUserForm.reset()
   })
 
  });

  //get a single document

  const docRef = doc(db, 'users', '6X29azVENnDgQ0GucDls')
  const unsubDoc = onSnapshot(docRef, (doc) => {
    console.log(doc.data, doc.id)
  });


  //signing users Up

  const signupForm = document.querySelector('.signup');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupForm.email.value
    const password = signupForm.password.value
    createUserWithEmailAndPassword(auth, email, password)
    .then ((cred) =>{
        // console.log('User created: ', cred.user);
        signupForm.reset();
    }).catch((err) => {
      console.log(err.message)
    })
  
  });

  //logging in and out
  const logoutButton = document.querySelector('.logout')
  logoutButton.addEventListener('click', () => {
    signOut(auth)
    .then(() => {
      // console.log('The user signed out')
    } ).catch((err) =>{
      console.log(err.message)
    })
  });

  const loginForm = document.querySelector('.login');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

      const email = loginForm.emailP.value
      const password = loginForm.passwordP.value
    signInWithEmailAndPassword(auth, email, password)
  .then((cred) =>{
  //   console.log('User logged in: ', cred.user)
  } )
  .catch((err) => {
    console.log(err.message)
  })
  });

  //subscribing to auth changes
  const unsubAuth = onAuthStateChanged(auth, (user) => {
    console.log('User status changed: ', user);
  });

  //unsubscribing from changes
  const unsubButton = document.querySelector('.unsub');
  unsubButton.addEventListener('click', () => {
    console.log('Unsubscribing !');
    unsubCol();
    unsubDoc();
    unsubAuth();
  });


 //Authentication

 onAuthStateChanged (auth, user => {
  if (user) {
   console.log('logged in!');
   
 }
  else {
   console.log('No user');
 }
});