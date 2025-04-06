import { Auth, getAuth, onAuthStateChanged, signInAnonymously, User } from 'firebase/auth';

export const auth: Auth = getAuth();

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