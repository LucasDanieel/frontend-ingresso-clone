import { createContext, ReactNode, useEffect, useState } from "react";
import { User, UserContextType } from "../@types/user";
import Cookies from "js-cookie";
import axios from "axios";

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      axios
        .get<User>(`${import.meta.env.VITE_URL_BACKEND}/user/auth?token=${token}`)
        .then((resp) => {
          setUser(resp.data);
        })
        .catch((err) => {
          if (err.response.data) {
            Cookies.remove("token");
          }
        });
    }
  }, [token]);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;
