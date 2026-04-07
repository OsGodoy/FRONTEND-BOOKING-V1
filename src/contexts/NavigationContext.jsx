import { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <NavigationContext.Provider value={{ loading, setLoading }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationLoader = () => useContext(NavigationContext);
