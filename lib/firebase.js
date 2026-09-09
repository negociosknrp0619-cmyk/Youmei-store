import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0oOfgizLOVGfO2p2r2pV_KKvP3eG-ZiQ",
  authDomain: "youmeistore-6fb51.firebaseapp.com",
  projectId: "youmeistore-6fb51",
  storageBucket: "youmeistore-6fb51.firebasestorage.app",
  messagingSenderId: "453553236219",
  appId: "1:453553236219:web:760358a3784a03cfd2685e",
  measurementId: "G-XKKP2WW5E3"
};

// Inicializar Firebase (solo si no se ha inicializado antes)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Exportar base de datos y autenticación para usarlos en el proyecto
export const db = getFirestore(app);
export const auth = getAuth(app);
