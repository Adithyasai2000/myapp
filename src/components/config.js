import firebase from "firebase/app";
import "firebase/auth";


const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyDLWR039BJbIIeY-eP-VCLmtF44YxEQdho",
    authDomain: "manaswini-enterprises.firebaseapp.com",
    databaseURL: "https://manaswini-enterprises-default-rtdb.firebaseio.com",
    projectId: "manaswini-enterprises",
    storageBucket: "manaswini-enterprises.appspot.com",
    messagingSenderId: "964558490517",
    appId: "1:964558490517:web:302c1f839270b2beba449c",
    measurementId: "G-Z3PL9RWNY5"
});


export default firebaseConfig;