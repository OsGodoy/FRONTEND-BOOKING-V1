export const ButtonBorderAmber = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`text-amber-400/90 border border-amber-400/90 rounded bg-amber-400/10 p-1 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonBorderPurple = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`text-purple-400/90 border border-purple-400/90 rounded bg-purple-400/10 p-1 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonBorderNeutral = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`text-neutral-400/90 border border-neutral-500/90 rounded bg-neutral-400/10 p-1 ${className}`}
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
      className={`text-emerald-400/90 border border-emerald-400/90 rounded bg-emerald-400/10 p-1 ${className}`}
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
      className={`text-neutral-400/90 border border-neutral-500/90 rounded bg-neutral-400/10 p-1 w-5 h-5 text-sm flex items-center justify-center ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
