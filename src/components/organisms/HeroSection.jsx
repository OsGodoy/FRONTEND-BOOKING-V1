import heroImg from "../../assets/images/hero.jpg";
import heroText from "../../assets/images/heroText.png";
import { DivContainerCenter } from "../atoms/DivContainer";

const HeroSection = () => {
  return (
    <DivContainerCenter className="relative h-100 lg:h-160 xl:h-180">
      <img
        src={heroImg}
        alt="Hero"
        className="w-full h-full object-cover object-top rounded"
      />

      <div className="absolute inset-0 bg-linear-to-t from-neutral-950 to-neutral-950/10" />

      <div className="absolute inset-0 flex flex-col items-center justify-end text-white text-center px-4">
        <img
          src={heroText}
          alt="HeroText"
          className="w-60 sm:w-70 md:w-80 lg:w-100 object-contain opacity-90 justify-self-end"
        />
      </div>
    </DivContainerCenter>
  );
};

export default HeroSection;
