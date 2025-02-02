// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { getAuth, signInAnonymously, onAuthStateChanged, User, Auth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

let app: FirebaseApp;
let auth: Auth;
let analytics: Analytics;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEjutJ_ii_pOS1UnXx-G4VG_fv6j0jkzk",
  authDomain: "alexguo-drinking-board-game-v3.firebaseapp.com",
  databaseURL: "https://alexguo-drinking-board-game-v3-default-rtdb.firebaseio.com",
  projectId: "alexguo-drinking-board-game-v3",
  storageBucket: "alexguo-drinking-board-game-v3.firebasestorage.app",
  messagingSenderId: "583174976430",
  appId: "1:583174976430:web:8e1f25527fa22ad3f08e3f",
  measurementId: "G-MRM7YCRLEQ"
};

export const initializeFirebase = () => {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  auth = getAuth();

};

export const getUser = () => {
  return new Promise((resolve, reject) => {
    signInAnonymously(auth).then(resolve).catch(reject);
  });
};

export const onAuthChanged = (callback: (u: User | null) => void) => {
  return onAuthStateChanged(auth, (u) => {
    if (u) {
      callback(u);
    } else {
      callback(null);
    }
  });
};