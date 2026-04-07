import { createContext, useState } from "react";

const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
  const [isSidebar, setIsSidebar] = useState(false);
  const values = { isSidebar, setIsSidebar };
  return (
    <SidebarContext.Provider value={values}>{children}</SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarProvider };
