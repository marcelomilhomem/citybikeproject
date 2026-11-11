import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect } from "react";
import { auth, githubProvider, googleProvider } from "../firebase";
import { signInWithPopup, signInAnonymously } from "firebase/auth";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // Errors are intentionally not caught here so the caller can show feedback.
  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

  const signInWithGithub = () => signInWithPopup(auth, githubProvider);

  const signInAnony = () => signInAnonymously(auth);

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
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ signInWithGithub, signInWithGoogle, logout, currentUser, signInAnony }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
