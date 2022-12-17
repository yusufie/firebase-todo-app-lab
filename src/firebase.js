// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKcsnwZ-nfFxey2GJrRzWRMP5dNgXuFdI",
  authDomain: "todo-43236.firebaseapp.com",
  projectId: "todo-43236",
  storageBucket: "todo-43236.appspot.com",
  messagingSenderId: "245690706",
  appId: "1:245690706:web:5fdb84efd537bdf86d4a8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;