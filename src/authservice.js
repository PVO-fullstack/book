import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getShoppingList } from './servisFirebase';

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

export function createUser(userEmail, userPassword, displayName) {
  const authCreate = getAuth();
  createUserWithEmailAndPassword(
    authCreate,
    userEmail,
    userPassword,
    displayName
  )
    .then(userCredential => {
      const userUid = userCredential.user.uid;
      const idToken = userCredential.user.accessToken;
      const idTokenJson = JSON.stringify(idToken);
      const uidJson = JSON.stringify(userUid);
      localStorage.setItem('token', idTokenJson);
      localStorage.setItem('uid', uidJson);
      return root.insertAdjacentHTML('beforeend', userIn(displayName));
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export function onLogin(email, password) {
  const authSign = getAuth();
  signInWithEmailAndPassword(authSign, email, password)
    .then(userCredential => {
      const userUid = userCredential.user.uid;
      const idToken = userCredential.user.accessToken;
      localStorage.setItem('token', JSON.stringify(idToken));
      localStorage.setItem('uid', JSON.stringify(userUid));
      const displayName = userCredential.user.displayName;
      getShoppingList().then(shoppingList => {
        console.log(shoppingList);
        if (shoppingList === null) {
          console.log('null');
          localStorage.setItem('list', null);
          return;
        }
        const qwe = Object.keys(shoppingList);
        const list = [];
        for (const key of qwe) {
          list.push(shoppingList[key]);
        }
        list.map(el => {
          const listJson = JSON.stringify(el);
          localStorage.setItem('list', listJson);
        });
      });
      return root.insertAdjacentHTML('beforeend', userIn(displayName));
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export function onLogOut() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      localStorage.setItem('uid', null);
      localStorage.setItem('token', null);
      localStorage.setItem('list', null);
      return (root.innerHTML = '');
    })
    .catch(error => {
      console.log(error.message);
    });
}
const userIn = displayName =>
  `<p style="margin: 0; background-color: chartreuse">Welcome, ${displayName}</p>`;

export async function onLogin1() {
  const email = 'PVO@email.com';
  const password = 'mypassword';
  const authSign = getAuth();
  signInWithEmailAndPassword(authSign, email, password)
    .then(userCredential => {
      const userUid = userCredential.user.uid;
      const idToken = userCredential.user.accessToken;
      console.log(userUid);

      // const idTokenJson = JSON.stringify(idToken);
      // const uidJson = JSON.stringify(userUid);
      localStorage.setItem('token', JSON.stringify(idToken));
      localStorage.setItem('uid', JSON.stringify(userUid));
      const displayName = userCredential.user.displayName;
      getShoppingList().then(shoppingList => {
        console.log(shoppingList);
        if (shoppingList === null) {
          console.log('null');
          localStorage.setItem('list', null);
          return;
        }
        const qwe = Object.keys(shoppingList);
        const list = [];
        for (const key of qwe) {
          list.push(shoppingList[key]);
        }
        list.map(el => {
          const listJson = JSON.stringify(el);
          localStorage.setItem('list', listJson);
        });
      });
      return root.insertAdjacentHTML('beforeend', userIn(displayName));
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
      const userUid = userCredential.user.uid;
      const idToken = userCredential.user.accessToken;
      const idTokenJson = JSON.stringify(idToken);
      const uidJson = JSON.stringify(userUid);
      localStorage.setItem('token', idTokenJson);
      localStorage.setItem('uid', uidJson);
      const displayName = userCredential.user.displayName;
      return root.insertAdjacentHTML('beforeend', userIn(displayName));
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
