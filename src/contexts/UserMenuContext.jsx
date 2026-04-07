import { createContext, useState } from "react";

const UserMenuContext = createContext();

const UserMenuProvider = ({ children }) => {
  const [isUserMenu, setIsUserMenu] = useState(false);
  const values = { isUserMenu, setIsUserMenu };
  return (
    <UserMenuContext.Provider value={values}>
      {children}
    </UserMenuContext.Provider>
  );
};

export { UserMenuContext, UserMenuProvider };
