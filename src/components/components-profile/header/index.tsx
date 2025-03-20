import { useContext } from "react";
import "./styles.scss";

import { UserContextType } from "../../../@types/user";
import { UserContext } from "../../../providers/user-provider";
import { IconHelp, IconPersonCircle } from "../../../icons";

const HeaderProfile = () => {
  const { user } = useContext(UserContext) as UserContextType;

  return (
    <div className="wrapper-profile-header">
      <div className="profile-header">
        <a href="/" className="profile-logo-header">
          <img src="https://ingresso-a.akamaihd.net/catalog/img/ingresso-logo-v1-desktop-final.svg" alt="INGRESSO" />
        </a>
        <div className="profile-header-options">
          <div className="profile-options">
            <IconPersonCircle />
            <span>Olá, {user?.name.split(" ")[0]}</span>
          </div>
          <div className="profile-help">
            <IconHelp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderProfile;
