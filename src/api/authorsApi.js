import { getData } from "./apiFactory";
import api from "./axios";

export const getAuthors = async () => {
  return await getData("/authors");
};
