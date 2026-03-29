const Input = ({ className = "", ...props }) => {
  return (
    <input
      {...props}
      className={`w-full py-2 px-3 outline-0 placeholder-neutral-500 focus:border-purple-400 focus:invalid:border-rose-400 text-neutral-400 border border-neutral-600 rounded transition-colors duration-300 ${className}`}
    />
  );
};
export default Input;
