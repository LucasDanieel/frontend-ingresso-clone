import { IconWithoutMovies } from "../../../icons";
import "./styles.scss";

const MovieNotFound = () => {
  return (
    <div className="movie-not-found">
      <IconWithoutMovies />
      <div className="movie-not-found-text">
        <h3>Filme não encontrado :(</h3>
        <span>Não encontramos o filme que você busca.</span>
      </div>
    </div>
  );
};

export default MovieNotFound;
