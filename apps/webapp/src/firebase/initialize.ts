import { getAnalytics } from 'firebase/analytics';
import { FirebaseApp, initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCEjutJ_ii_pOS1UnXx-G4VG_fv6j0jkzk',
  authDomain: 'alexguo-drinking-board-game-v3.firebaseapp.com',
  databaseURL: 'https://alexguo-drinking-board-game-v3-default-rtdb.firebaseio.com',
  projectId: 'alexguo-drinking-board-game-v3',
  storageBucket: 'alexguo-drinking-board-game-v3.firebasestorage.app',
  messagingSenderId: '583174976430',
  appId: '1:583174976430:web:8e1f25527fa22ad3f08e3f',
  measurementId: 'G-MRM7YCRLEQ',
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
