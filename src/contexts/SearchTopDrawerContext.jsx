import { createContext, useState } from "react";

const SearchTopDrawerContext = createContext();

const SearchTopDrawerProvider = ({ children }) => {
  const [isSearchTopDrawer, setIsSearchTopDrawer] = useState(false);
  const values = { isSearchTopDrawer, setIsSearchTopDrawer };
  return (
    <SearchTopDrawerContext.Provider value={values}>
      {children}
    </SearchTopDrawerContext.Provider>
  );
};

export { SearchTopDrawerContext, SearchTopDrawerProvider };
