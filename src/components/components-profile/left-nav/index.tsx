import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Cookies from "js-cookie";
import "./styles.scss";

import { UserContextType } from "../../../@types/user";
import { UserContext } from "../../../providers/user-provider";
import { IconDoorOpen, IconForm, IconPersonCircle, IconTicket } from "../../../icons";

const LeftNavProfile = () => {
  const { user, setUser } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    Cookies.remove("token");
    Cookies.remove("info_profile");
    navigate("/minha-conta");
  };

  return (
    <div className="wrapper-nav-profile">
      <div className="wrapper-info-profile">
        <a href="/">Voltar para a página principal</a>
        <h3>
          Olá, {user?.name} :)
          <br />
          Essa é a sua conta.
        </h3>
        <div className="profile-icon-email">
          <IconPersonCircle />
          <span>{user?.email}</span>
        </div>
      </div>
      <div className="nav-profile">
        <ul>
          <li>
            <NavLink to="/minha-conta/meus-pedidos" className={({ isActive }) => (isActive ? "isActive" : "")}>
              <IconTicket />
              <span>Meus pedidos: Cinema</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/minha-conta/meus-pedidos-eventos" className={({ isActive }) => (isActive ? "isActive" : "")}>
              <IconTicket />
              <span>Meus Pedidos: Shows, Teatro e mais</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/minha-conta/edicao-de-cadastro" className={({ isActive }) => (isActive ? "isActive" : "")}>
              <IconForm />
              <span>Dados Pessoais</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="wrapper-logout">
        <div className="logout" onClick={handleLogout} data-testid="button-logout-left-nav">
          <IconDoorOpen />
          <span>Sair</span>
        </div>
      </div>
    </div>
  );
};

export default LeftNavProfile;
