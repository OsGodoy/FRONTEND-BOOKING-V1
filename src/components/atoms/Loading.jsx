import { Loader } from "lucide-react";
import { DivContainerCenter } from "./DivContainer";

const Loading = () => {
  return (
    <DivContainerCenter className="text-amber-400">
      <Loader className="animate-spin [animation-duration:2s]" />
      <p>Cargando</p>
    </DivContainerCenter>
  );
};

export default Loading;
