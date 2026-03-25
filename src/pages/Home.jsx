import { DivContainerCenter } from "../components/atoms/DivContainer";
import BooksList from "../components/molecules/BooksList";
import FilterInfo from "../components/molecules/FilterInfo";

const HomePage = () => {
  return (
    <DivContainerCenter>
      <FilterInfo />
      <BooksList />
    </DivContainerCenter>
  );
};

export default HomePage;
