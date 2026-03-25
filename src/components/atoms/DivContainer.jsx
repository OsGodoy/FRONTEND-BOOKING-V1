export const DivContainerCenter = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`flex-1 flex flex-col items-center justify-center w-full ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const DivContainerStart = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`flex flex-col items-start justify-center ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const DivContainerGrid = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`grid gap-4 place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-80 sm:max-w-160 md:max-w-200 lg:max-w-280 xl:max-w-7xl 2xl:max-w-360 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
