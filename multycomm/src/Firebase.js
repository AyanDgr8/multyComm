// src/Firebase.js

// import firebase from "./Firebase";
import "firebase/firestore";

import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCxBaGWCjE1F7zRUheeXzoHfCLUUYDj6hg",
    authDomain: "multycomm-e1901.firebaseapp.com",
    projectId: "multycomm-e1901",
    storageBucket: "multycomm-e1901.appspot.com",
    messagingSenderId: "141466163369",
    appId: "1:141466163369:web:6c0f27bb28ab34514cf1b8",
    measurementId: "G-SQKXH5GFWM"
  };

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)
//   const db = getDatabase();
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () =>{
    try{
        const response = await signInWithPopup(auth, googleProvider)
        const user = response.user 
        const q = query(collection(db, "users"), where ("uid", "==", user.uid))
        const docs = await getDocs(q)
        if(docs.docs.length === 0){
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
                })
        }

    } catch(error){
        console.log(error.message);
        alert(error.message);

    }
  };

const logInWithEmailAndPassword = async (email,password) =>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch(error){
        console.log(error.message);
    }
}

const registerWithEmailAndPassword = async(name,email, password) => {
    try{
        const response = await createUserWithEmailAndPassword(auth, email, password)
        const user = response.user
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch(error){
        console.log(error.message);
    }
};

const sendPasswordReset = async(email) => {
    try {
        await sendPasswordResetEmail(auth,email)
        alert("Password reset link sent!");
    } catch(error){
        console.log(error.message);
    }
}

const logOut = () =>{
    signOut(auth);
}


export {
    auth, db, 
    signInWithGoogle, 
    logInWithEmailAndPassword, 
    registerWithEmailAndPassword,
    sendPasswordReset,
    logOut,
}  