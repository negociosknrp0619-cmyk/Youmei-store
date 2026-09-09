import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { dummyProducts as products } from "../data/dummyProducts.mjs";

const firebaseConfig = {
  apiKey: "AIzaSyD0oOfgizLOVGfO2p2r2pV_KKvP3eG-ZiQ",
  authDomain: "youmeistore-6fb51.firebaseapp.com",
  projectId: "youmeistore-6fb51",
  storageBucket: "youmeistore-6fb51.firebasestorage.app",
  messagingSenderId: "453553236219",
  appId: "1:453553236219:web:760358a3784a03cfd2685e",
  measurementId: "G-XKKP2WW5E3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function uploadData() {
  console.log("Subiendo productos a Firebase...");
  const productsRef = collection(db, "products");
  
  let count = 0;
  for (const product of products) {
    // Usar el ID del producto como ID del documento en Firebase
    const docRef = doc(productsRef, product.id.toString());
    await setDoc(docRef, product);
    count++;
    console.log(`Subido: ${product.name}`);
  }
  
  console.log(`¡Éxito! Se subieron ${count} productos a la base de datos.`);
  process.exit(0);
}

uploadData().catch(console.error);
