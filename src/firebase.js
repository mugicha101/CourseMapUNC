// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCU0OwuLWP4ESPxy-57A4xV7nmz8BYZU6Y",
    authDomain: "unccourses.firebaseapp.com",
    databaseURL: "https://unccourses-default-rtdb.firebaseio.com",
    projectId: "unccourses",
    storageBucket: "unccourses.appspot.com",
    messagingSenderId: "872354948738",
    appId: "1:872354948738:web:046f9a2e7edc472b76369b",
    measurementId: "G-TFF022P6KH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;