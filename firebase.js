import "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseconfig = {
  apiKey: "AIzaSyCIyUPgXo9hRtXIyzePcIlLkQQCbU2lP_0",
  authDomain: "mybikeproject-dev.firebaseapp.com",
  projectId: "mybikeproject-dev",
  storageBucket: "mybikeproject-dev.appspot.com",
  messagingSenderId: "427275924263",
  appId: "1:427275924263:web:3ed3bd2bdcd61991862f02",
};

const app = initializeApp(firebaseconfig);

export const auth = app.auth();
export default app;
