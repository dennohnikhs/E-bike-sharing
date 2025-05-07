import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDzE1LUtuN_Y56QzBz88mkIare1OcdO6Fs",
    authDomain: "biketrack-39f1c.firebaseapp.com",
    databaseURL: "https://biketrack-39f1c-default-rtdb.firebaseio.com",
    projectId: "biketrack-39f1c",
    storageBucket: "biketrack-39f1c.firebasestorage.app",
    messagingSenderId: "676323051014",
    appId: "1:676323051014:web:329d417542c511c8582587"
};
  
  // Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);