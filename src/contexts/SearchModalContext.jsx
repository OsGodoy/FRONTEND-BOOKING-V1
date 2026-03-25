import { createContext, useState } from "react";

const SearchModalContext = createContext();

const SearchModalProvider = ({ children }) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const values = { isSearchModalOpen, setIsSearchModalOpen };
  return (
    <SearchModalContext.Provider value={values}>
      {children}
    </SearchModalContext.Provider>
  );
};

export { SearchModalContext, SearchModalProvider };
