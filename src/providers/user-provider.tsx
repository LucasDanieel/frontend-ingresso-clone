import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { User, UserContextType } from "../@types/user";
import Cookies from "js-cookie";
import axios from "axios";

export const UserContext = createContext<UserContextType>({} as UserContextType);

const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      axios
        .get<User>(`/user/auth?token=${token}`)
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
