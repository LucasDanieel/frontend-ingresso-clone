import { NavLink } from "react-router-dom";
import "./styles.scss";

const NavHeader = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/filmes" className={({ isActive }) => (isActive ? "active-link" : "")}>
            FILMES
          </NavLink>
        </li>
        <li>
          <NavLink to="/cinemas" className={({ isActive }) => (isActive ? "active-link" : "")}>
            CINEMAS
          </NavLink>
        </li>
        <li>
          <NavLink to="/teatros" className={({ isActive }) => (isActive ? "active-link" : "")}>
            TEATRO
          </NavLink>
        </li>
        <li>
          <NavLink to="/eventos" className={({ isActive }) => (isActive ? "active-link" : "")}>
            EVENTOS
          </NavLink>
        </li>
        <li>
          <NavLink to="/noticias" className={({ isActive }) => (isActive ? "active-link" : "")}>
            NOTÍCIAS
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavHeader;
