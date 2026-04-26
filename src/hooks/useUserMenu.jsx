import { LogOut, Settings } from "lucide-react";

export const useUserMenu = () => {
  const userMenuList = [
    {
      id: "perfil",
      label: "Ver perfil",
      icon: null,
      link: "/perfil",
    },
    {
      id: "config",
      label: "Configuración",
      icon: Settings,
      link: "/config",
    },
    {
      id: "salir",
      label: "Salir",
      icon: LogOut,
      link: "/logout",
    },
  ];

  return { userMenuList };
};
