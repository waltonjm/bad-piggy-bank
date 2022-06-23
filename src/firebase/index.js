import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

const config = {
  apiKey: "AIzaSyDntmjX3gY6-idkhg09FE7vmkJnYgroKew",
  authDomain: "piggybank-3d763.firebaseapp.com",
  projectId: "piggybank-3d763",
  storageBucket: "piggybank-3d763.appspot.com",
  messagingSenderId: "973270542549",
  appId: "1:973270542549:web:c3b82e3c8ad4f92d15da5c",
};

const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    if (!user) return { error: "Invalid username or password" };
    const docSnap = await getDoc(doc(db, "user", user.uid));
    if (!docSnap.exists()) return console.log("No such document!");
    const { balance, name } = docSnap.data();
    return { balance, email, id: user.uid, name };
  } catch (error) {
    if (error.code === "auth/user-not-found" || error.code === "auth/invalid-email" || error.code === "auth/wrong-password") {
      return { error: "Invalid username or password" };
    }
    console.log(error);
    return {error: "Unknown error"}
  }
};

export const signup = async (email, password, name) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (!user) return { error: "No user" };    
    const balance = 0;
    await setDoc(doc(db, "user", user.uid), { balance, email, name });
    return { balance, email, id: user.uid, name };
  } catch (error) {
    if (error.code === "auth/email-already-in-user") {
      return { error: "Email already in use" };
    }
    console.log(error);
    return {error: "Unknown error"}
  }
};
