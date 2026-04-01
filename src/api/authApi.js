import api from "./axios";

export const login = async (credentials) => {
  try {
    const { data } = await api.post("/auth/login", credentials);
    return data;
  } catch (error) {
    console.log(error.response?.data);
    throw error;
  }
};

export const register = async (user) => {
  try {
    const { data } = await api.post("/auth/register", user);
    return data;
  } catch (error) {
    console.log(error.response?.data);
    throw error;
  }
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const getMe = async () => {
  try {
    const { data } = await api.get("/auth/me");
    return data;
  } catch (error) {
    if (error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};
