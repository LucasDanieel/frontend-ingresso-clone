import { useEffect } from "react";
import Cookies from "js-cookie";

import ButtonStyle from "../../components/button-style";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

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
            <ButtonStyle text="Vamos lá!" isButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersEvents;
