import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import "./styles.scss";

import ButtonGradient from "../../components/buttons-styles/button-gradient";

const MyOrdersEvents = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/minha-conta");
  }, [token]);

  return (
    <div className="container-my-orders-events">
      <h3>Shows, teatro e mais</h3>
      <div className="wrapper-see-my-tickets">
        <div className="see-my-tickets">
          <svg width="180" height="151">
            <use xlinkHref="/assets/icons.svg#super-homem"></use>
          </svg>
          <div className="my-tickets">
            <p>Veja seus ingressos!</p>
            <span>
              Redirecionaremos você para a página onde poderá acessar e visualizar seus pedidos para shows, teatro e
              mais.
            </span>
            <ButtonGradient text="Vamos lá!" fontBold handleClickEvent={() => navigate("/")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersEvents;
