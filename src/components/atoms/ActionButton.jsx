import { scaleFx } from "../../constants/styles";

const ActionButton = ({
  className = "",
  itemId,
  items = [],
  addMutation,
  removeMutation,
  isInListFn,
  variant = "toggle",
  onRemoveStart,
  onRemoveEnd,
  icons,
  disabled = false,
}) => {
  const isInList = isInListFn(items, itemId);

  // Detectar si es un objeto de React Query o una función directa
  const isAdding = addMutation?.isPending ?? false;
  const isRemoving = removeMutation?.isPending ?? false;
  const isLoading = isAdding || isRemoving;

  const handleClick = () => {
    if (isLoading || disabled) return;

    // Extrae la función de ejecución
    const addFn =
      typeof addMutation === "function" ? addMutation : addMutation?.mutate;
    const removeFn =
      typeof removeMutation === "function"
        ? removeMutation
        : removeMutation?.mutate;

    if (variant === "remove") {
      onRemoveStart?.();
      if (isInList && removeFn) {
        // Soporta callback
        if (removeMutation?.mutate) {
          removeMutation.mutate(itemId, { onSettled: () => onRemoveEnd?.() });
        } else {
          removeFn(itemId);
          onRemoveEnd?.();
        }
      }
      return;
    }

    if (isInList) {
      removeFn?.(itemId);
    } else {
      addFn?.(itemId);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading || disabled}
      className={`w-full flex items-center justify-center ${className} ${scaleFx("sm")}`}
    >
      {variant === "remove" ? icons.remove : icons.toggle(isInList, isLoading)}
    </button>
  );
};

export default ActionButton;
