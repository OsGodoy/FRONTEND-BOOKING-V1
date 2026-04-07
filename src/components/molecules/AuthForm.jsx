import { useForm } from "react-hook-form";
import { DivContainerCenter } from "../atoms/DivContainer";
import Input from "../atoms/Input";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

const AuthForm = ({ type = "login", onSubmit }) => {
  const isRegister = type === "register";
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 w-full"
    >
      {isRegister && (
        <DivContainerCenter>
          <Input
            type="text"
            placeholder="Nombre"
            {...register("name", {
              required: "El nombre es obligatorio",
            })}
          />
          {errors.name ? (
            <span className="flex items-center justify-end w-full gap-1 text-rose-400 text-responsive-xs font-light mt-1">
              {errors.name.message}
            </span>
          ) : (
            <span className="text-transparent pointer-events-none w-full text-responsive-xs font-light mt-1">
              ghost
            </span>
          )}
        </DivContainerCenter>
      )}

      <DivContainerCenter>
        <Input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "El email es obligatorio",
          })}
        />
        {errors.email ? (
          <span className="flex items-center justify-end w-full gap-1 text-rose-400 text-responsive-xs font-light mt-1">
            {errors.email.message}
          </span>
        ) : (
          <span className="text-transparent pointer-events-none w-full text-responsive-xs font-light mt-1">
            ghost
          </span>
        )}
      </DivContainerCenter>

      <DivContainerCenter>
        <DivContainerCenter className="flex-row gap-2">
          <Input
            type={showPass ? "text" : "password"}
            placeholder="Contraseña"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "Mínimo 6 caracteres",
              },
            })}
            className="flex-2"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
            className="text-neutral-500 py-2 px-3 border border-neutral-600 rounded"
          >
            {showPass ? (
              <EyeClosed className="stroke-1" />
            ) : (
              <Eye className="stroke-1" />
            )}
          </button>
        </DivContainerCenter>
        {errors.password ? (
          <span className="flex items-center justify-end w-full gap-1 text-rose-400 text-responsive-xs font-light mt-1">
            {errors.password.message}
          </span>
        ) : (
          <span className="text-transparent pointer-events-none w-full text-responsive-xs font-light mt-1">
            ghost
          </span>
        )}
      </DivContainerCenter>

      {isRegister && (
        <DivContainerCenter>
          <Input
            type="password"
            placeholder="Confirmar contraseña"
            {...register("confirmPassword", {
              required: "Confirma tu contraseña",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
          />
          {errors.confirmPassword ? (
            <span className="flex items-center justify-end w-full gap-1 text-rose-400 text-responsive-xs font-light mt-1">
              {errors.confirmPassword.message}
            </span>
          ) : (
            <span className="text-transparent pointer-events-none w-full text-responsive-xs font-light mt-1">
              ghost
            </span>
          )}
        </DivContainerCenter>
      )}

      <button
        type="submit"
        className={`font-semibold py-2 rounded
          ${isRegister ? "text-neutral-800 bg-amber-500" : "text-white bg-purple-500"}
          `}
      >
        {isRegister ? "Registrarse" : "Iniciar sesión"}
      </button>
    </form>
  );
};

export default AuthForm;
