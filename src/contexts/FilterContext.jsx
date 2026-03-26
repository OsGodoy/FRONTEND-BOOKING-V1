import { createContext, useState } from "react";

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const initialState = {
    author: null,
    genre: null,
    search: "",
  };

  const [isFilters, setIsFilters] = useState(initialState);

  const values = { initialState, isFilters, setIsFilters };

  return (
    <FilterContext.Provider value={values}>{children}</FilterContext.Provider>
  );
};

export { FilterContext, FilterProvider };
