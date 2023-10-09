// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import firebase from "firebase/compat/app";
import { get } from "mongoose";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const app=firebase.initializeApp({
  apiKey: "AIzaSyCb4cp8-8FnSJm0_7z-dNwOpIt4SJtAvG0",
  authDomain: "thinkware.firebaseapp.com",
  projectId: "thinkware",
  storageBucket: "thinkware.appspot.com",
  messagingSenderId: "534463592373",
  appId: "1:534463592373:web:7a8d3ebe281162275d4bfc",
});

// Initialize Firebase
const provider=new GoogleAuthProvider();
 const auth=getAuth();

 const signInwithGoogle= ()=>{
     signInWithPopup(auth,provider).then((res)=>{
    localStorage.setItem("name",res.user.name);
console.log("firebase.js",res.user.name);
}).catch((err)=>console.log(err))
}

export { app,auth,provider,signInwithGoogle }