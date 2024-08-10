import { auth, db } from '@/config/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';

const initialState = {
  checkingStatus: true,
  isLoggedIn: false,
};

interface AuthContextType {
  checkingStatus: boolean;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType>(initialState);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
        setCheckingStatus(false);
      });
    };

    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, checkingStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
