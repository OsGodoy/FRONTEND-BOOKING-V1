import { createContext, useState } from "react";

const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const values = { isSidebarOpen, setIsSidebarOpen };
  return (
    <SidebarContext.Provider value={values}>{children}</SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarProvider };
