// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "teste",
  authDomain: "todo-app-8dfb0.firebaseapp.com",
  projectId: "todo-app-8dfb0",
  storageBucket: "todo-app-8dfb0.firebasestorage.app",
  messagingSenderId: "39248498213",
  appId: "1:39248498213:web:712504502e884d414479cc",
  measurementId: "G-Q2CQ428GQB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
