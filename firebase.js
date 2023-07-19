import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIyUPgXo9hRtXIyzePcIlLkQQCbU2lP_0",
  authDomain: "mybikeproject-dev.firebaseapp.com",
  projectId: "mybikeproject-dev",
  storageBucket: "mybikeproject-dev.appspot.com",
  messagingSenderId: "427275924263",
  appId: "1:427275924263:web:3ed3bd2bdcd61991862f02",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
