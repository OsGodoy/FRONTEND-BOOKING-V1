import { Link } from "react-router-dom";
import {
  DivContainerCenter,
  DivContainerModal,
} from "../components/atoms/DivContainer";
import AuthForm from "../components/molecules/AuthForm";
import { Crown } from "lucide-react";

const RegisterPage = () => {
  const handleRegister = (data) => {
    console.log("REGISTER", data);
  };
  return (
    <DivContainerCenter>
      <Link
        to="/"
        className="flex items-center justify-center w-full gap-2 text-5xl font-bold text-purple-500 py-6"
      >
        booking{" "}
        <span>
          <Crown className="size-12 text-amber-400 fill-amber-400" />
        </span>{" "}
      </Link>
      <DivContainerModal className="flex-col py-5">
        <AuthForm type="register" onSubmit={handleRegister} />
      </DivContainerModal>
      <p className="mt-4 text-neutral-400 text-sm">
        ¿Ya no tienes cuenta?{" "}
        <Link
          to={"/auth/login"}
          className="text-purple-400/90 border border-purple-400/90 rounded bg-purple-400/10 p-1 ml-1"
        >
          Iniciar sesión
        </Link>
      </p>
    </DivContainerCenter>
  );
};

export default RegisterPage;
