import { useContext } from "react";
import { FilterContext } from "../../contexts/FilterContext";

const FilterInfo = () => {
  const { initialState, filters, setFilters } = useContext(FilterContext);

  return <>FilterInfo</>;
};

export default FilterInfo;
