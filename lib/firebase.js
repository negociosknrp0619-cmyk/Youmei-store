import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, initializeFirestore, persistentLocalCache } from "firebase/firestore";
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

// Configurar Firestore con caché local persistente para que cargue instantáneamente
let db;
try {
  db = initializeFirestore(app, {
    localCache: persistentLocalCache()
  });
} catch (e) {
  // En caso de que ya se haya inicializado, usamos getFirestore
  db = getFirestore(app);
}

export { db };
export const auth = getAuth(app);
