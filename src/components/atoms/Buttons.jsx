import { scaleFx } from "../../constants/styles";

export const ButtonBorderAmber = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`text-amber-400/90 border border-amber-400/90 rounded bg-amber-400/10 p-1 ${className} ${scaleFx("sm")}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonBorderPurple = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`text-purple-400/90 border border-purple-400/90 rounded bg-purple-400/10 p-1 ${className} ${scaleFx("sm")}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonBorderNeutral = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`text-neutral-400/90 border border-neutral-500/90 rounded bg-neutral-400/10 p-1 ${className} ${scaleFx("sm")}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonBorderEmerald = ({
  children,
  className = "",
  onClick,
  ...props
}) => {
  return (
    <button
      className={`text-emerald-400/90 border border-emerald-400/90 rounded bg-emerald-400/10 p-1 ${className} ${scaleFx("sm")}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonCart = ({ children, className = "", onClick, ...props }) => {
  return (
    <button
      className={`text-neutral-400/90 border border-neutral-500/90 rounded bg-neutral-400/10 p-1 w-5 h-5 lg:w-6 lg:h-6 text-responsive-sm flex items-center justify-center ${className} ${scaleFx("sm")}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonBorderRose = ({
  children,
  className = "",
  onClick,
  ...props
}) => {
  return (
    <button
      className={`text-rose-400/90 border border-rose-400/90 rounded bg-rose-400/10 p-1 ${className} ${scaleFx("sm")}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonCarousel = ({
  children,
  className = "",
  onClick,
  ...props
}) => {
  return (
    <button
      className={`border border-neutral-700 bg-neutral-900/80 p-2 rounded-full ${className} ${scaleFx("sm")}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
