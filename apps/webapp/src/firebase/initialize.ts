import { getAnalytics } from 'firebase/analytics';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth, onAuthStateChanged, signInAnonymously, User } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCEjutJ_ii_pOS1UnXx-G4VG_fv6j0jkzk',
  authDomain: 'alexguo-drinking-board-game-v3.firebaseapp.com',
  databaseURL: 'https://alexguo-drinking-board-game-v3-default-rtdb.firebaseio.com',
  projectId: 'alexguo-drinking-board-game-v3',
  storageBucket: 'alexguo-drinking-board-game-v3.firebasestorage.app',
  messagingSenderId: '583174976430',
  appId: '1:583174976430:web:8e1f25527fa22ad3f08e3f',
  measurementId: 'G-MRM7YCRLEQ'
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth: Auth = getAuth();

const functions = getFunctions(app);

// Connect to emulator if running on localhost
// if (window.location.origin.includes('localhost')) {
//   connectFunctionsEmulator(functions, "127.0.0.1", 5001);
// }

export const gameRequest = httpsCallable(functions, 'gameRequest');

export const getUser = () => {
  return new Promise((resolve, reject) => {
    signInAnonymously(auth).then(resolve).catch(reject);
  });
};

export const onAuthChanged = (callback: (u: User | null) => void) => {
  return onAuthStateChanged(auth, (u) => {
    if (u) {
      // Logged in
      callback(u);
    } else {
      // Logged out
      callback(null);
    }
  });
};