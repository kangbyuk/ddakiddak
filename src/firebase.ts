import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAZBlbYvJbESrTVCXuaZ1g7ftagLlIwJIs",
  authDomain: "ddakiddak-bf10b.firebaseapp.com",
  projectId: "ddakiddak-bf10b",
  storageBucket: "ddakiddak-bf10b.firebasestorage.app",
  messagingSenderId: "255952879714",
  appId: "1:255952879714:web:b8fb627abe30ec2414513b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };