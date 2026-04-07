import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

const ScrollToTopButton = ({ scrollRef }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const container = scrollRef?.current;

    if (!container) return;

    const handleScroll = () => {
      setShow(container.scrollTop > 300);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollRef]);

  const handleClick = () => {
    scrollRef.current.scrollTo({
      top: 240,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-20 md:bottom-8 right-2 md:right-10 z-40 p-2.5 rounded-full bg-purple-600 text-purple-200 shadow-lg transition-all duration-300 ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ChevronUp size={20} />
    </button>
  );
};

export default ScrollToTopButton;
