// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3sOT7Ecs76qmPkPvbG-ud_jcBk4qLchs",
  authDomain: "smartspend-a00bb.firebaseapp.com",
  projectId: "smartspend-a00bb",
  storageBucket: "smartspend-a00bb.firebasestorage.app",
  messagingSenderId: "897688271924",
  appId: "1:897688271924:web:b2ad69886feb948e64de61",
  measurementId: "G-NVKXEJSDWH"
}

// Initialize Firebase (prevent re-initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app)

export default app
