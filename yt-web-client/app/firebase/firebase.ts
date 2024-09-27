// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth,
    signInWithPopup, 
    GoogleAuthProvider,
    onAuthStateChanged,
    User
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZEkdgIjMfLdhzVE6UGhFVvxUm27MbwdM",
  authDomain: "yt-clone-fcd25.firebaseapp.com",
  projectId: "yt-clone-fcd25",
  appId: "1:404971007160:web:2c6280c8c295bc6c11184d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


/**
 * Signs the user in with a Google popup.
 * @returns A promise that resolves with user's credentials/
 */
export function signInWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider);
}

/**
 * Signs the user out.
 * @returns A promise that resolves when the user is signed out.
 */
export function signOut() {
    return auth.signOut();
}

/**
 * Trigger a callback when user auth state changes.
 * @returns A function to unsubscribe callback.
 */
export function onAuthStateChangedHelper(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }