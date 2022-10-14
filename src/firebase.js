
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import 'firebase/firestore'
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyC6XJ9TTMi-Q2ea3cAynGr9pG_YZQMheP4",
  authDomain: "devtraining-2ec83.firebaseapp.com",
  projectId: "devtraining-2ec83",
  storageBucket: "devtraining-2ec83.appspot.com",
  messagingSenderId: "642377465042",
  appId: "1:642377465042:web:87fcf888fbf34eb1a8c10b",
  measurementId: "G-1G9CMQPFRV"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db=getFirestore(app)
export const auth = getAuth(app);
