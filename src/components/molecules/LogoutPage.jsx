import { useContext, useEffect } from "react";
import Loading from "../atoms/Loading";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useAuthData";
import LoaderPage from "../../pages/Loader";
import { UserMenuContext } from "../../contexts/UserMenuContext";

const LogoutPage = () => {
  const navigate = useNavigate();
  const { mutate: logoutUser } = useLogout();
  const { setIsUserMenu } = useContext(UserMenuContext);

  useEffect(() => {
    logoutUser(undefined, {
      onSuccess: () => {
        setIsUserMenu(false);
        navigate("/");
      },
    });
  }, []);

  return <LoaderPage children="Cerrando sesión..." />;
};

export default LogoutPage;
