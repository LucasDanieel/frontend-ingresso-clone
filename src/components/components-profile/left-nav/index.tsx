import { useContext } from "react";
import "./styles.scss";

import { UserContextType } from "../../../@types/user";
import { UserContext } from "../../../providers/user-provider";
import { NavLink } from "react-router-dom";

const LeftNavProfile = () => {
  const { user } = useContext(UserContext) as UserContextType;

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
          <span>{user?.email}</span>
        </div>
      </div>
      <div className="nav-profile">
        <ul>
          <li>
            <NavLink to="/minha-conta/meus-pedidos" className={({ isActive }) => (isActive ? "isActive" : "")}>
              <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.772 3.847c-.222.222-.205.621-.033.885a2.151 2.151 0 0 1-.277 2.697 2.151 2.151 0 0 1-2.697.277c-.264-.172-.648-.205-.87.017L2.768 8.852c-.69.69-.623 1.982.07 2.675l9.762 9.762c.693.693 2.028.804 2.719.114l1.085-1.13c.23-.228.132-.698-.057-.962a2.152 2.152 0 0 1 .23-2.768 2.151 2.151 0 0 1 2.767-.23c.265.19.73.292.958.063l1.096-1.052c.69-.69.58-1.982-.114-2.675L11.52 2.887c-.375-.375-.924-.58-1.46-.58-.454 0-.898.149-1.216.466L7.772 3.847Zm1.524.951.668-.669c.166-.166.378-.123.545.045l9.458 9.457c.167.167.24.408.074.574l-.669.669c-1.265-.622-2.86-.443-3.885.583-1.025 1.024-1.21 2.625-.587 3.89l-.702.7c-.165.166-.428.115-.595-.053L4.167 10.56c-.168-.168-.211-.422-.045-.587l.751-.752c.479.216.99.328 1.495.328.812 0 1.606-.29 2.22-.903.995-.995 1.27-2.6.708-3.847Zm-2.087 6.575a.375.375 0 0 0-.01.53l5.216 5.408a.375.375 0 0 0 .54-.52L7.74 11.38a.374.374 0 0 0-.53-.01v.002Z"
                  fill="#CCC"
                ></path>
              </svg>
              <span>Meus pedidos: Cinema</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/minha-conta/meus-pedidos-eventos" className={({ isActive }) => (isActive ? "isActive" : "")}>
              <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.772 3.847c-.222.222-.205.621-.033.885a2.151 2.151 0 0 1-.277 2.697 2.151 2.151 0 0 1-2.697.277c-.264-.172-.648-.205-.87.017L2.768 8.852c-.69.69-.623 1.982.07 2.675l9.762 9.762c.693.693 2.028.804 2.719.114l1.085-1.13c.23-.228.132-.698-.057-.962a2.152 2.152 0 0 1 .23-2.768 2.151 2.151 0 0 1 2.767-.23c.265.19.73.292.958.063l1.096-1.052c.69-.69.58-1.982-.114-2.675L11.52 2.887c-.375-.375-.924-.58-1.46-.58-.454 0-.898.149-1.216.466L7.772 3.847Zm1.524.951.668-.669c.166-.166.378-.123.545.045l9.458 9.457c.167.167.24.408.074.574l-.669.669c-1.265-.622-2.86-.443-3.885.583-1.025 1.024-1.21 2.625-.587 3.89l-.702.7c-.165.166-.428.115-.595-.053L4.167 10.56c-.168-.168-.211-.422-.045-.587l.751-.752c.479.216.99.328 1.495.328.812 0 1.606-.29 2.22-.903.995-.995 1.27-2.6.708-3.847Zm-2.087 6.575a.375.375 0 0 0-.01.53l5.216 5.408a.375.375 0 0 0 .54-.52L7.74 11.38a.374.374 0 0 0-.53-.01v.002Z"
                  fill="#CCC"
                ></path>
              </svg>
              <span>Meus Pedidos: Shows, Teatro e mais</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/minha-conta/edicao-de-cadastro" className={({ isActive }) => (isActive ? "isActive" : "")}>
              <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21.375 5.202c0-.802-.65-1.452-1.452-1.452H4.077c-.802 0-1.452.65-1.452 1.452V18.75c0 .802.65 1.452 1.452 1.452h15.846c.802 0 1.452-.65 1.452-1.452V5.202Zm-17.298 0h15.846V18.75H4.077V5.202Zm8.298 2.58c0-.363-.318-.657-.71-.657h-5.33c-.392 0-.71.294-.71.656v3.938c0 .362.318.656.71.656h5.33c.392 0 .71-.294.71-.656V7.78Zm-6 .093h5.25v3.75h-5.25v-3.75Zm12-.375c0-.207-.134-.375-.3-.375H14.157c-.157.012-.282.175-.282.375 0 .207.134.375.3.375H18.093c.157-.012.282-.175.282-.375Zm-.3 1.875c.166 0 .3.168.3.375 0 .2-.125.363-.282.374l-.018.001h-3.9c-.166 0-.3-.168-.3-.375 0-.2.125-.363.282-.374l.018-.001h3.9Zm.3 2.625c0-.207-.134-.375-.3-.375H14.157c-.157.012-.282.175-.282.375 0 .207.134.375.3.375H18.093c.157-.012.282-.175.282-.375Zm-.33 4.125c.182 0 .33.168.33.375 0 .2-.137.363-.31.374l-.02.001H5.955c-.182 0-.33-.168-.33-.375 0-.2.137-.363.31-.374l.02-.001h12.09Zm.33-1.875c0-.207-.148-.375-.33-.375H5.935c-.173.012-.31.175-.31.375 0 .207.148.375.33.375h12.11c.173-.012.31-.175.31-.375Z"
                  fill="#fff"
                ></path>
              </svg>
              <span>Dados Pessoais</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="wrapper-logout">
        <div className="logout">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-door-open"
            viewBox="0 0 16 16"
          >
            <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
            <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
          </svg>
          <span>Sair</span>
        </div>
      </div>
    </div>
  );
};

export default LeftNavProfile;
