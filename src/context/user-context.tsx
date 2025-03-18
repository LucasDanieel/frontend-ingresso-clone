import { createContext, ReactNode, useEffect, useState } from "react";
import { User, UserContextType } from "../@types/user";
import Cookies from "js-cookie";
import axios from "axios";

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      axios
        .get<User>(`${import.meta.env.VITE_URL_BACKEND}/user/auth?token=${token}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => console.error(err.response));
    }
  }, []);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

export default UserProvider;
