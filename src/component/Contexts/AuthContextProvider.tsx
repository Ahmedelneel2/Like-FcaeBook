import React, { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
interface AuthContextType {
  token: string | null;
  setUserToken: (userToken: string | null) => void;
  logOut: () => void;
}

export const authContext = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  function setUserToken(userToken: string | null) {
    setToken(userToken);
  }

  function logOut() {
    setToken(null);
    localStorage.removeItem("token");
  }

  return (
    <authContext.Provider
      value={{
        token,
        setUserToken,
        logOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;