// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: any = {
    apiKey: "AIzaSyBtYVOF0YmMcn4JiYHbbKXeXq6CN85rviw",
    authDomain: "bu-rant.firebaseapp.com",
    projectId: "bu-rant",
    storageBucket: "bu-rant.appspot.com",
    messagingSenderId: "770694940432",
    appId: "1:770694940432:web:b701beca689229faf20795",
    measurementId: "G-LMRPCZPZH7"
};

// Initialize Firebase
const app: any = initializeApp(firebaseConfig);

export const db: any = getFirestore(app)