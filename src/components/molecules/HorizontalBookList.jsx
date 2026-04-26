const HorizontalBookList = ({
  title = "Otros libros",
  className = "",
  children,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center w-full my-5 pt-4 border-t border-neutral-800 ${className}`}
    >
      <h2 className="text-responsive-lg text-neutral-400 font-semibold mb-3 w-full max-w-280">
        {title}
      </h2>

      <div className="flex gap-4 px-4">{children}</div>
    </div>
  );
};

export default HorizontalBookList;
