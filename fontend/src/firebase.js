// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // thêm cái này để login

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPW51ixMupwcrNE6nV1wP0R-JLAOyDKtw",
  authDomain: "web-phucnguyen.firebaseapp.com",
  projectId: "web-phucnguyen",
  storageBucket: "web-phucnguyen.appspot.com",
  messagingSenderId: "826643692003",
  appId: "1:826643692003:web:bf2660c517deac8ead08d6",
  measurementId: "G-CHJHGS58X7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Xuất auth để dùng cho login
export const auth = getAuth(app);
