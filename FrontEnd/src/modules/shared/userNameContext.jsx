import React, { useState } from "react";

// context is used to manage  state accross all components
// If entire app reloads, context is gone (reset)
export const userContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logIn = (userData) => {
    setUser(userData);
  };
  const setName = (userData) => {
    setUser(userData);
  };

  const logOut = () => {
    setUser(null);
  };

  return (
    <userContext.Provider value={{ user, logIn, logOut, setName }}>
      {children}
    </userContext.Provider>
  );
};
