import { createContext, PropsWithChildren, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { cityHistoryType, User, UserContextType } from "../@types/user";
import { getCity } from "../utils/crud-methods";
import { useSearchParams } from "react-router-dom";

export const UserContext = createContext<UserContextType>({} as UserContextType);

const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [cityHistory, setCityHistory] = useState<cityHistoryType[] | null>(null);
  const [actualCity, setActualCity] = useState<cityHistoryType | null>(null);

  const [searchParams] = useSearchParams();
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
    const city = searchParams.get("city");

    loadCityHistory(city);
  }, [searchParams]);

  const loadCityHistory = async (city: string | null) => {
    const cityHistory = localStorage.getItem("city_history");

    if (cityHistory) {
      const history = JSON.parse(cityHistory) as cityHistoryType[];

      if (city) {
        var index = history.findIndex((obj) => obj.slug === city);

        if (index == -1) {
          const objCity = await getCity(city);

          if (objCity) {
            history.unshift(objCity);
            setActualCity(objCity);
            setCityHistory(history);
            localStorage.setItem("city_history", JSON.stringify(history));
          } else {
            setActualCity(history[0]);
            setCityHistory(history);
          }
        } else {
          var newCity = history.splice(index, 1);
          history.unshift(newCity[0]);
          setActualCity(history[0]);
          setCityHistory(history);
          localStorage.setItem("city_history", JSON.stringify(history));
        }
      } else {
        setActualCity(history[0]);
        setCityHistory(history);
      }
    } else {
      var objCity: cityHistoryType | null;

      if (city) {
        objCity = await getCity(city);

        if (objCity == null) {
          objCity = await getCity("sao-paulo");
        }
      } else {
        objCity = await getCity("sao-paulo");
      }

      if (objCity) {
        var newHistory = [objCity];
        setActualCity(newHistory[0]);
        setCityHistory(newHistory);
        localStorage.setItem("city_history", JSON.stringify(newHistory));
      } else {
        alert("Cidade não encontrada");
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        cityHistory,
        setCityHistory,
        actualCity,
        setActualCity,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
