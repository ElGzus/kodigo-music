// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";
import { uid } from "uid"; // Asumiendo que has instalado la librería "uid"

const firebaseConfig = {
  apiKey: "AIzaSyANYoStd60aWKPgSq3aOUUn6DrJyhPcsfs",
  authDomain: "kodigo-music-9c525.firebaseapp.com",
  projectId: "kodigo-music-9c525",
  storageBucket: "kodigo-music-9c525.appspot.com",
  messagingSenderId: "804782804937",
  appId: "1:804782804937:web:54a303b5bc223fbd162218"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const db = getDatabase(app);

// Genera un UID único
export const generateUid = () => uid();

