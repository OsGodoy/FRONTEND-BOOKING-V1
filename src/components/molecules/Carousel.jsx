import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ButtonCarousel } from "../atoms/Buttons";

const Carousel = ({ title = "Otros libros", className = "", children }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 250;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`w-full mt-5 pt-5 border-t border-neutral-800 ${className}`}
    >
      <h2 className="text-responsive-lg text-neutral-400 font-semibold mb-3">
        {title}
      </h2>

      <div className="relative">
        <ButtonCarousel
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
        >
          <ChevronLeft />
        </ButtonCarousel>

        <div
          ref={scrollRef}
          className="flex gap-4 scroll-smooth overflow-x-auto px-4"
        >
          {children}
        </div>

        <ButtonCarousel
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
        >
          <ChevronRight />
        </ButtonCarousel>
      </div>
    </div>
  );
};

export default Carousel;
