import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmZqsQO2KfGNSMuMdQ4rZQEJdzm7yV0wM",
  authDomain: "my-sns-550be.firebaseapp.com",
  projectId: "my-sns-550be",
  storageBucket: "my-sns-550be.appspot.com",
  messagingSenderId: "962009941697",
  appId: "1:962009941697:web:f41edf963377abf2b23640",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
