import { Link } from "react-router-dom";
import { moviesProps } from "../../@types/movie";
import { IconStar } from "../../icons";
import { getDayAndMonth, isToday } from "../../utils/input-methods";
import "./styles.scss";

const OldMovieCard = ({ film }: { film: moviesProps }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const movieDate = new Date(film.premiereDate + "T00:00:00");

  return (
    <div className="movie">
      <Link className="wrapper-movie-img" to={`/filme/${film.slug}`}>
        <div className={`movie-img${film.preSale ? " pre-venda" : ""}`} data-testid="div-old-movie-img">
          <img src={film.posterImage} alt="imagem do filme" />
        </div>
        <div className={`age BG${film.classification}`}>{film.classification}</div>
      </Link>
      {movieDate > today && (
        <div className="premiere" data-testid="div-old-movie-premiere">
          <span>Estreia {getDayAndMonth(movieDate)}</span>
        </div>
      )}
      {isToday(movieDate) && (
        <div className="premiere today" data-testid="div-old-movie-premiere">
          <div className="icon-today">
            <IconStar />
          </div>
          <span>Estreia hoje</span>
        </div>
      )}
      <Link className="wrapper-name-movie" to={`/filme/${film.slug}`}>
        <span>{film.name}</span>
      </Link>
    </div>
  );
};

export default OldMovieCard;
