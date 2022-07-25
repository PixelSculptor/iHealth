import './sass/main.scss'
import { profilPanel } from './profilPanelView';

import { initializeApp 
} from 'firebase/app';


import { getAuth, 
onAuthStateChanged,
createUserWithEmailAndPassword ,
signOut, signInWithEmailAndPassword,
GoogleAuthProvider, signInWithPopup,
FacebookAuthProvider
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
<aside class="aside">
    <section class="aside__navLogo logo">
        
        <h1 class="logo__title"><span class="material-symbols-outlined">monitor_heart</span> iHealth</h1>
        <h2 class="logo__subtitle">Elektroniczna kartoteka zawsze przy Tobie</h2>
    </section>
    
    <section class="aside__features">
        <div class="features__item feature">
            <span class="material-symbols-outlined">database</span>
            <h4 class="feature__title">Dostęp dostęp do najpotrzebniejszych informacji kiedy tylko potrzebujesz.</h4>
            <div class="feature__description">Architektura kartoteki oparta o przechowywanie danych w spersonalizowanej chmurze.</div>
        </div>
        
        <div class="features__item feature">
            <span class="material-symbols-outlined">medical_information</span>
            <h4 class="feature__title">Karta medyczna daje ci dostęp do Twoich kuracji, grupy krwi, uczuleń, a także certyfikatów i krwiodawstwie.</h4>
            <div class="feature__description">iHealth to innowacyjny sposób śledzenia Twoich procesów leczenia oraz informacji niezbędnych do udzielenia Tobie pomocy przez ratowników podczas wypadków.</div>
        </div>
        
        <div class="features__item feature">
            <span class="material-symbols-outlined">medical_services</span>
            <h4 class="feature__title">Możliwość wgrywania badań, recept i skierowań</h4>
            <div class="feature__description">Z iHealth twój lekarz zawsze bedzie miał pełny obraz twojego stanu zdrowia </div>
        </div>
    </section>
</aside>
<main class="signInPanel">

    <section class="signInPanel__login login">
        <h3 class="login__question">Masz już konto?</h3>
        <button class="login__switchLogin">Zaloguj się</button>
    </section>
    
    <section class="signInPanel__registration register">
        <div class="register__api">
                <h2 class="register__createBanner">Stwórz darmowe konto</h2>
                <button class="register__createWith" id="loginGoogle">Zaloguj się przez Google <i class="fa fa-brands fa-google"></i></button>
                <button class="register__createWith" id="loginFacebook">Zaloguj się przez Facebook <i class="fa fa-brands fa-facebook"></i> </button>
                <span class="register__other">lub</span>
</div>
        
        
        <form class="register__form" action="">
            <div class="inputWrapper">
                <label class="label" for="email">Email</label>
                <input class="inputData" id="email" name="email" type="email" placeholder="jan_kowalski@o2.pl" required>
            </div>
            <div class="inputWrapper">
                <label class="label" for="password">Hasło</label>
                <input class="inputData" id="password" name="password" type="password" required>
            </div>
            
            <input class="confirmRegistration" type="submit" value="Dołącz przez email">
            
        </form>
    </section>
    
</main>
`



const db = getFirestore();
const auth = getAuth();
const colRef = collection(db, 'users');
const q = query(colRef, orderBy('createdAt'));

//signing users Up

    const signupForm = document.querySelector('.register__form');
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = signupForm.email.value
      const password = signupForm.password.value
      createUserWithEmailAndPassword(auth, email, password)
      .then ((cred) =>{
          console.log('User created: ', cred.user);
        //   //signupForm.reset();
        // document.querySelector('#app').innerHTML = profilPanel
      }).catch((err) => {
        console.log(err.message)
      })
    
    });



//google auth //


document.getElementById('loginGoogle').addEventListener('click', GoogleLogin);
document.getElementById('loginFacebook').addEventListener('click', FacebookLogin);

function GoogleLogin(){
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(res =>{
        console.log(res)

    }).catch(err =>{
        console.log(err)
    })
}

//facebook auth//

function FacebookLogin(){
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider).then(res =>{
        console.log(res);

    }).catch(err =>{
        console.log(err.message);
    })
}

