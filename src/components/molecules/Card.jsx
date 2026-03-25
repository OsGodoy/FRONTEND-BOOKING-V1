const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center w-full sm:w-72 md:w-80 xl:w-72 2xl:w-80 h-120 bg-neutral-900 border rounded-xl border-neutral-700 ${className}`}
    >
      {children}
    </div>
  );
};

Card.Header = ({ children, className = "" }) => {
  return (
    <div
      className={`flex flex-5 p-3 w-full border-b border-neutral-800 ${className}`}
    >
      {children}
    </div>
  );
};

Card.Content = ({ children, className = "" }) => {
  return (
    <div className={`flex flex-col flex-1 p-3 w-full ${className}`}>
      {children}
    </div>
  );
};

Card.Footer = ({ children, className = "" }) => {
  return (
    <div
      className={`flex flex-col flex-1 p-3 w-full border-t border-neutral-800 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
