import { createContext, PropsWithChildren, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { cityHistoryType, User, UserContextType } from "../@types/user";
import { getCity } from "../utils/crud-methods";

export const UserContext = createContext<UserContextType>({} as UserContextType);

const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [cityHistory, setCityHistory] = useState<cityHistoryType[] | null>(null);
  const [actualCity, setActualCity] = useState<cityHistoryType | null>(null);
  const [updateCityHistory, setUpdateCityHistory] = useState<boolean>(false);

  const token = Cookies.get("token");
  const info = Cookies.get("info_profile");

  useEffect(() => {
    if (token) {
      if (info) setUser(JSON.parse(info));
      else {
        axios
          .get(`/user/auth?token=${token}`)
          .then((resp) => {
            const { name, email } = resp.data;
            Cookies.set("info_profile", JSON.stringify({ name, email }));
            setUser({ name, email });
          })
          .catch((err) => console.error(err));
      }
    } else {
      Cookies.remove("token");
      Cookies.remove("info_profile");
    }
  }, [token]);

  useEffect(() => {
    loadCityHistory();
  }, [updateCityHistory]);

  const loadCityHistory = async () => {
    const cityHistory = localStorage.getItem("city_history");

    if (cityHistory) {
      const history = JSON.parse(cityHistory) as cityHistoryType[];
      setActualCity(history[0]);
      setCityHistory(history);
    } else {
      const objCity = await getCity("sao-paulo");

      if (objCity) {
        var newHistory = [objCity];
        localStorage.setItem("city_history", JSON.stringify(newHistory));
        setActualCity(newHistory[0]);
        setCityHistory(newHistory);
      } else {
        alert("Cidade não encontrada");
      }
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, cityHistory, setCityHistory, actualCity, setActualCity, setUpdateCityHistory }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
