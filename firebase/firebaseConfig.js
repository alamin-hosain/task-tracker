// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTKA8YyL_1-ZgK9gOdFJqfXjWEzr9HJ0k",
    authDomain: "task-tracker-e4ca1.firebaseapp.com",
    projectId: "task-tracker-e4ca1",
    storageBucket: "task-tracker-e4ca1.appspot.com",
    messagingSenderId: "698429882067",
    appId: "1:698429882067:web:97d240717aa33880e79e26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;