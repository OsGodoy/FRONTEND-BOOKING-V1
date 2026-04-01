import { Link, Navigate } from "react-router-dom";
import {
  DivContainerCenter,
  DivContainerModal,
} from "../components/atoms/DivContainer";
import AuthForm from "../components/molecules/AuthForm";
import { ChevronsLeft, Crown } from "lucide-react";
import {
  ButtonBorderAmber,
  ButtonBorderNeutral,
} from "../components/atoms/Buttons";
import { useAuth, useLogin } from "../hooks/useAuthData";
import Loading from "../components/atoms/Loading";

const LoginPage = () => {
  const { mutate, isPending, isError } = useLogin();
  const { user, isAuthenticated, isLoading } = useAuth();

  const handleLogin = (formData) => {
    mutate(formData);
  };

  if (isLoading) return <Loading />;

  if (isPending) return <Loading children="Iniciando sesión" />;

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <DivContainerCenter>
      <Link to="/" className="text-xs fixed top-5 left-5">
        <ButtonBorderNeutral className="flex items-center justify-center ">
          <span>
            <ChevronsLeft className="size-4" />
          </span>
          Volver a la página de inicio
        </ButtonBorderNeutral>
      </Link>
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
        <Link to={"/auth/register"}>
          <ButtonBorderAmber className="ml-1">Regístrate</ButtonBorderAmber>
        </Link>
      </p>
    </DivContainerCenter>
  );
};

export default LoginPage;
