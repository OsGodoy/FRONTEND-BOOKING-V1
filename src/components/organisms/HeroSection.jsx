import heroImg from "../../assets/images/hero.webp";
import heroText from "../../assets/images/heroText.webp";
import { DivContainerCenter } from "../atoms/DivContainer";

const HeroSection = () => {
  return (
    <DivContainerCenter className="relative h-100 lg:h-160 xl:h-180 bg-neutral-900">
      <img
        src={heroImg}
        alt="Hero"
        className="w-full h-full object-cover object-top rounded opacity-0 transition-opacity duration-300"
        onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
        loading="eager"
      />

      <div className="absolute inset-0 bg-linear-to-t from-neutral-950 to-neutral-950/10" />

      <div className="absolute inset-0 flex flex-col items-center justify-end text-white text-center px-4">
        <img
          src={heroText}
          alt="HeroText"
          className="w-60 sm:w-70 md:w-80 lg:w-100 object-contain justify-self-end opacity-0 transition-opacity duration-300"
          onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
          loading="eager"
        />
      </div>
    </DivContainerCenter>
  );
};

export default HeroSection;
