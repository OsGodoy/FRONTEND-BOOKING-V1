import { Loader } from "lucide-react";
import { DivContainerCenter } from "./DivContainer";

const Loading = ({ children = "cargando" }) => {
  return (
    <DivContainerCenter className="text-amber-400">
      <Loader className="animate-spin [animation-duration:2s]" />
      <p>{children}</p>
    </DivContainerCenter>
  );
};

export default Loading;
