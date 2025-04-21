import { IconWithoutMovies } from "../../../icons";
import "./styles.scss";

const WithoutMovies = () => {
  return (
    <div className="without-movies">
      <IconWithoutMovies />
      <div className="without-movies-text">
        <h3>Não há filmes em cartaz no momento :(</h3>
        <span>Voltar novamente mais tarde</span>
      </div>
    </div>
  );
};

export default WithoutMovies;
