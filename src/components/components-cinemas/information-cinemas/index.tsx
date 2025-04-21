import { useContext } from "react";
import "./styles.scss";

import { UserContextType } from "../../../@types/user";
import { IconFullHeart, IconPhone, IconPopcornAndSoda } from "../../../icons";
import { UserContext } from "../../../providers/user-provider";
import WrapperLoadingCinemas from "../wrapper-loading-cinemas";
import { Link } from "react-router-dom";

type informationCinemasProps = {
  isLoading: boolean;
};

const InformationCinemas = ({ isLoading }: informationCinemasProps) => {
  const { actualCity, user } = useContext(UserContext) as UserContextType;

  return (
    <>
      <div className="cinemas-information">
        <h1>Cinemas - {actualCity?.name}</h1>
        <div className="information-icons">
          <IconPopcornAndSoda />
          <span>Venda de Produtos</span>
        </div>
        <div className="information-icons">
          <IconPhone />
          <span>Ingresso no Celular</span>
        </div>
      </div>
      <div className="title-favorite-cinemas">
        <h3>Favoritos</h3>
      </div>
      <div className="wrapper-favorites-cinemas">
        {!user == null ? (
          <div className="favorites-cinemas">
            <div className="svg-favorites-cinemas">
              <IconFullHeart />
            </div>
            <span>
              Faça <Link to="/minha-conta">Login</Link> ou <Link to="/minha-conta/cadastro">Cadastre-se</Link> para ver
              seus cinemas favoritos aqui!
            </span>
          </div>
        ) : isLoading ? (
          <div className="wrapper-is-loading">
            <WrapperLoadingCinemas />
            <WrapperLoadingCinemas />
            <WrapperLoadingCinemas />
          </div>
        ) : (
          <div className="favorites-cinemas">
            <div className="svg-favorites-cinemas">
              <IconFullHeart />
            </div>
            <span>Você ainda não tem nenhum cinema favorito. Toque os corações para favoritar!</span>
          </div>
        )}
      </div>
    </>
  );
};

export default InformationCinemas;
