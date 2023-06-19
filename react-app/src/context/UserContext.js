import React, { createContext, useState } from "react";
const UserContext = createContext({ name: "", auth: false });
const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "", auth: false });
  const login = (name) => {
    setUser((user) => ({
      name: name,
      auth: true,
    }));
  };

  const logout = () => {
    setUser((user) => ({ name: "", auth: false }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
