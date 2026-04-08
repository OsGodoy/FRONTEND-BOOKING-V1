import { Link, useNavigate } from "react-router-dom";
import {
  DivContainerCenter,
  DivContainerModal,
} from "../components/atoms/DivContainer";
import AuthForm from "../components/molecules/AuthForm";
import { ChevronsLeft, Crown } from "lucide-react";
import {
  ButtonBorderPurple,
  ButtonBorderNeutral,
} from "../components/atoms/Buttons";
import { useAuth, useRegister } from "../hooks/useAuthData";
import Loading from "../components/atoms/Loading";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import LoaderPage from "./Loader";

const RegisterPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending, isError } = useRegister();
  const { user, isAuthenticated, isLoading } = useAuth();

  const handleRegister = (formData) => {
    mutate(formData, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["authUser"]);
      },
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) return <LoaderPage />;

  if (isPending) return <Loading children={"Creando cuenta"} />;

  return (
    <DivContainerCenter className="relative max-w-360 h-full">
      <Link
        to="/#books-section"
        className="text-responsive-xs absolute top-5 left-0"
      >
        <ButtonBorderNeutral className="flex items-center justify-center ">
          <span>
            <ChevronsLeft className="size-4" />
          </span>
          Volver a la página de inicio
        </ButtonBorderNeutral>
      </Link>
      <Link
        to="/#books-section"
        className="flex items-center justify-center w-full gap-2 text-responsive-4xl font-bold text-purple-500 py-6"
      >
        book's
        <span className="flex items-center text-amber-400">
          king
          <Crown className="size-10 fill-amber-400" />
        </span>{" "}
      </Link>
      <DivContainerModal className="flex-col py-5 max-w-80 lg:max-w-90">
        <AuthForm type="register" onSubmit={handleRegister} />
      </DivContainerModal>
      <p className="mt-4 text-neutral-400 text-responsive-sm">
        ¿Ya no tienes cuenta?{" "}
        <Link to={"/auth/login"}>
          <ButtonBorderPurple className="ml-1">
            Iniciar sesión
          </ButtonBorderPurple>
        </Link>
      </p>
    </DivContainerCenter>
  );
};

export default RegisterPage;
