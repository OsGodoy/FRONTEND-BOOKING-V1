import { useLocation } from "react-router-dom";
import { DivContainerCenter } from "../components/atoms/DivContainer";
import BooksList from "../components/molecules/BooksList";
import FilterInfo from "../components/molecules/FilterInfo";
import HeroSection from "../components/organisms/HeroSection";
import { useEffect } from "react";

const HomePage = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);
  return (
    <DivContainerCenter className="justify-start h-full">
      <div className="w-full">
        <HeroSection />
      </div>
      <div
        id="books-section"
        className="w-full flex flex-col items-center justify-center z-10 px-4"
      >
        <FilterInfo />
        <BooksList />
      </div>
    </DivContainerCenter>
  );
};

export default HomePage;
