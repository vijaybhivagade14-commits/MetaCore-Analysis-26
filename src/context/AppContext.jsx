import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("auth") === "true"
  );

  const login = () => {
    localStorage.setItem("auth", "true");
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setIsAuth(false);
  };

  return (
    <AppContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};