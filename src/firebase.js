// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, createUserWithEmailAndPassword, } from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc, } from "firebase/firestore";
import Swal from "sweetalert2";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANOkQPRYCM0V7XjXnmgparVpimIbruH50",
  authDomain: "gameshelf-646a7.firebaseapp.com",
  databaseURL: "https://gameshelf-646a7-default-rtdb.firebaseio.com",
  projectId: "gameshelf-646a7",
  storageBucket: "gameshelf-646a7.appspot.com",
  messagingSenderId: "1089064780513",
  appId: "1:1089064780513:web:20bc6cc5c007b7f13fada0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// initialize Google authentication
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {

  // try all the Google log-in procedure, if it fails we catch it later
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;

    // here we look in the database to see if the user is there (by uid)
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);

    // if the user is not there, let's create them and add them to the db
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error Received",
      text: `Google Authentication error: ${err}`
    })
  }
}

// we know that the user is in the database, so...
// basically we try the provided function, and catch errors
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error Received",
      text: `Authentication error: ${err}`
    })
  }
}

// we know the user is not in the database, so we register them
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error Received",
      text: `Registration error: ${err}`
    })
  }
}

// send a password reset link to an email address
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    Swal.fire({
      icon: "info",
      title: "E-mail Sent",
      text: `Password reset link sent to e-mail ${email}`
    });
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error Received",
      text: `Password reset error: ${err}`
    })
  }
}

// logout from Firebase
const logout = () => {
  signOut(auth);
}

export {auth, db, signInWithGoogle, logInWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordReset, logout};