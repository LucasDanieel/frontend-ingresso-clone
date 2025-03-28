import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Cookies from "js-cookie";
import "./styles.scss";

import WrapperDropdown from "../wrapper-dropdown";
import { User, UserContextType } from "../../../@types/user";
import { UserContext } from "../../../providers/user-provider";

type DropdownMenuProfileProps = {
  left: number;
  user: User;
};

const DropdownMenuProfile = ({ left, user }: DropdownMenuProfileProps) => {
  const { setUser } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    Cookies.remove("token");
    Cookies.remove("info_profile");
    navigate("/minha-conta");
  };

  return (
    <WrapperDropdown left={left}>
      <div className="container-menu-profile" data-testid="menu-profile-component">
        <h3>Olá, {user.name}</h3>
        <ul>
          <li>
            <a href="/minha-conta/meus-pedidos" target="_blank">
              Meus Pedidos
            </a>
          </li>
          <li>
            <a href="/minha-conta/meus-pedidos-eventos" target="_blank">
              Meus Pedidos: Shows, Teatro e Mais
            </a>
          </li>
          <li>
            <a href="/minha-conta/edicao-de-cadastro" target="_blank">
              Dados Pessoais
            </a>
          </li>
        </ul>
        <div className="line-border"></div>
        <p onClick={handleLogout}>Sair da Conta</p>
      </div>
    </WrapperDropdown>
  );
};

export default DropdownMenuProfile;
