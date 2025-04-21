import { IconWithoutMovies } from "../../../icons";
import "./styles.scss";

const WithoutCinema = () => {
  return (
    <div className="without-cinema">
      <IconWithoutMovies />
      <div className="without-cinema-text">
        <h3>Não há cinemas no momento :(</h3>
        <span>Voltar novamente mais tarde</span>
      </div>
    </div>
  );
};

export default WithoutCinema;
