import { createContext, useState } from "react";

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const initialState = {
    author: null,
    genre: null,
    search: "",
  };

  const [filters, setFilters] = useState(initialState);

  const values = { initialState, filters, setFilters };

  return (
    <FilterContext.Provider value={values}>{children}</FilterContext.Provider>
  );
};

export { FilterContext, FilterProvider };
