import axios from "axios";
import { cityHistoryType } from "../@types/user";

export const getCity = async (slug: string): Promise<cityHistoryType | null> => {
  return axios
    .get<cityHistoryType>(`/city/get-by-slug?slug=${slug}`)
    .then((resp) => {
      return resp.data;
    })
    .catch(() => {
      return null;
    });
};
