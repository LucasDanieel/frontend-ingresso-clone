import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./styles.scss";

import ButtonGradient from "../../components/buttons-styles/button-gradient";

const MyOrders = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/minha-conta");
  }, [token]);

  return (
    <div className="container-my-orders">
      <h3>Meus Pedidos</h3>
      <div className="without-orders">
        <p>Você ainda não tem pedidos</p>
        <svg width="194" height="161">
          <use xlinkHref="/assets/icons.svg#super-homem"></use>
        </svg>
      </div>
      <div className="find-movies-events">
        <ButtonGradient text="Encontrar filmes e eventos" fontBold handleClickEvent={() => navigate("/")} />
      </div>
    </div>
  );
};

export default MyOrders;
