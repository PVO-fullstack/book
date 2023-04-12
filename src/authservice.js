import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCq9mOndO3g-rUoq_LhFsLf4QY5_4L9fkc',
  authDomain: 'books-314f3.firebaseapp.com',
  databaseURL:
    'https://books-314f3-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'books-314f3',
  storageBucket: 'books-314f3.appspot.com',
  messagingSenderId: '627795944798',
  appId: '1:627795944798:web:853f1b3c49bede1282dbcf',
  measurementId: 'G-L8HC0K2SWK',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const root = document.querySelector('.root');

// const email = 'PVO@email.com';
// const password = 'mypassword';

// let displayName = '';
const uName = 'Vova';

export function createUser(userEmail, userPassword, displayName) {
  const authCreate = getAuth();
  createUserWithEmailAndPassword(
    authCreate,
    userEmail,
    userPassword,
    displayName
  )
    .then(userCredential => {
      uidQ = userCredential.user.uid;
      const uidJ = JSON.stringify(uidQ);
      localStorage.setItem('uid', uidJ);
      return root.insertAdjacentHTML(
        'beforeend',
        `<p style="margin: 0; background-color: chartreuse">Welcome, ${displayName}</p>`
      );
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

let uidQ = null;

export function onLogin1() {
  const email = 'PVO@email.com';
  const password = 'mypassword';
  const authSign = getAuth();
  signInWithEmailAndPassword(authSign, email, password)
    .then(userCredential => {
      // console.log(userCredential.user.displayName);
      const user = userCredential.user.stsTokenManager.accessToken;
      uidQ = userCredential.user.uid;
      const uidJ = JSON.stringify(uidQ);
      localStorage.setItem('uid', uidJ);
      const displayName = userCredential.user.displayName;
      return root.insertAdjacentHTML(
        'beforeend',
        `<p style="margin: 0; background-color: chartreuse">Welcome, ${displayName}</p>`
      );
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export function onLogin2() {
  const email = 'Vsar@email.com';
  const password = 'mypassword';
  const authSign = getAuth();
  signInWithEmailAndPassword(authSign, email, password)
    .then(userCredential => {
      // console.log(userCredential.user.displayName);
      const user = userCredential.user.stsTokenManager.accessToken;
      uidQ = userCredential.user.uid;
      const uidJ = JSON.stringify(uidQ);
      localStorage.setItem('uid', uidJ);
      const displayName = userCredential.user.displayName;
      return root.insertAdjacentHTML(
        'beforeend',
        `<p style="margin: 0; background-color: chartreuse">Welcome, ${displayName}</p>`
      );
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

// function onChangeName() {
//   const auth = getAuth();
//   updateProfile(auth.currentUser, {
//   displayName: "Sova"
//   }).then(() => {
//   return  root.insertAdjacentHTML('beforeend', `<p>${displayName}</p>`);

//   // Profile updated!
//   // ...
// }).catch((error) => {
//   // An error occurred
//   // ...
// });
// };

export function onLogOut() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      localStorage.setItem('uid', null);
      return (root.innerHTML = '');
    })
    .catch(error => {});
}
