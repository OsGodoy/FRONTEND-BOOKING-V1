import { useState } from "react";
import { Image, ImageOff } from "lucide-react";

const BookCover = ({ book, variant }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!book.cover || hasError) {
    return (
      <div
        className={`flex items-center justify-center w-full
      ${variant === "carousel" ? "h-full" : "h-64"}
      ${variant === "cart" && "max-h-50"}
      `}
      >
        <ImageOff
          className={`text-neutral-700 stroke-1
          ${variant === "carousel" ? "size-8" : "size-12"}
          `}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-64
    ${variant === "carousel" && "max-h-40"}
    ${variant === "cart" && "max-h-50"}
    ${variant === "details" && "lg:h-80"}
    `}
    >
      {!isLoaded && (
        <div
          className={`flex items-center justify-center w-full h-64 absolute inset-0 animate-pulse [animation-duration:1s]
        ${variant === "carousel" ? "h-full" : "h-64"}
        ${variant === "cart" && "max-h-50"}
        `}
        >
          <Image
            className={`text-neutral-500 stroke-1
            ${variant === "carousel" ? "size-8" : "size-12"}
            `}
          />
        </div>
      )}

      <img
        src={`${import.meta.env.VITE_API_URL}/image?url=${encodeURIComponent(book.cover)}`}
        alt={book.title}
        loading="lazy"
        decoding="async"
        width="300"
        height="450"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-contain transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default BookCover;
