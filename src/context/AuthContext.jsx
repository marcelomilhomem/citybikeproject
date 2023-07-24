import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect } from "react";
import { auth, githubProvider, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGithub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const logout = () => {
    signOut(auth);
    navigate("/");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribe;
    };
  });

  return (
    <AuthContext.Provider
      value={{ signInWithGithub, signInWithGoogle, logout, currentUser }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
