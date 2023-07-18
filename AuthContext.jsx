import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect } from "react";
import { auth, googleProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

import { useState } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(currentUser);
    });
    return () => {
      unsubscribe;
    };
  });

  return (
    <AuthContext.Provider value={{ signInWithGoogle, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
