import { Link } from "react-router-dom";
import {
  DivContainerCenter,
  DivContainerModal,
} from "../components/atoms/DivContainer";
import AuthForm from "../components/molecules/AuthForm";
import { Crown } from "lucide-react";

const LoginPage = () => {
  const handleLogin = (data) => {
    console.log("LOGIN", data);
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
        <AuthForm type="login" onSubmit={handleLogin} />
      </DivContainerModal>
      <p className="mt-4 text-neutral-400 text-sm">
        ¿Aún no tienes cuenta?{" "}
        <Link
          to={"/auth/register"}
          className="text-amber-400/90 border border-amber-400/90 rounded bg-amber-400/10 p-1 ml-1"
        >
          Regístrate
        </Link>
      </p>
    </DivContainerCenter>
  );
};

export default LoginPage;
