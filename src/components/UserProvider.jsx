import React from "react";

// context pulls user. then set User state
// by default start with []
export const UserContext = React.createContext(null);

// Custom user hook
export const useUser = () => React.useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [me, setMe] = React.useState();
  const setBalance = (balance) => setMe({ ...me, balance: Number(balance) });
  const setUser = (user) => setMe(user);
  const logout = () => setMe();

  return (
    <UserContext.Provider value={{ me, logout, setUser, setBalance }}>
      {children}
    </UserContext.Provider>
  );
};
