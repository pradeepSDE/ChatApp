import React, { createContext, useState, useEffect } from 'react';
import { getAuth } from  'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = getAuth();
  const [currentUser, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    
    return () => {
        unsubscribe();
      };
    }, []);

  return (
    <AuthContext.Provider value={{currentUser} }>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;