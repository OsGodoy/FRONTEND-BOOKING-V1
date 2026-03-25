export const UlContainerCenter = ({ children, className = "", ...props }) => {
  return (
    <ul
      className={`flex flex-col items-start justify-center gap-1 ${className}`}
      {...props}
    >
      {children}
    </ul>
  );
};

export const LiContainer = ({ children, className = "", ...props }) => {
  return (
    <li
      className={`items-center justify-between p-4 w-full ${className}`}
      {...props}
    >
      {children}
    </li>
  );
};
