import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyDxi6PJz4KFX-oozBNDVW5ex9ylh54KtZc",
  authDomain: "ecommerce-fadail.firebaseapp.com",
  projectId: "ecommerce-fadail",
  storageBucket: "ecommerce-fadail.appspot.com",
  messagingSenderId: "110486252908",
  appId: "1:110486252908:web:8be16840eaadca182a5749"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)