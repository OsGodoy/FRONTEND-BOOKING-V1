import { getData } from "./apiFactory";
import api from "./axios";

export const getGenres = async () => {
  return await getData("/genres");
};
