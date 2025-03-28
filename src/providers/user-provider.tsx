import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { User, UserContextType } from "../@types/user";
import Cookies from "js-cookie";
import axios from "axios";

export const UserContext = createContext<UserContextType>({} as UserContextType);

const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
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

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;
