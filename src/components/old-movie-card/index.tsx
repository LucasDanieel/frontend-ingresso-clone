import { FilmsProps } from "../../@types/movie";
import "./styles.scss";

const OldMovieCard = ({ film }: { film: FilmsProps }) => {
  return (
    <div className="movie">
      <a className="wrapper-movie-img" href="">
        <div className={`movie-img${film.pre_venda ? " pre-venda" : ""}`} data-testid="div-movie-img">
          <img src={film.img} alt="imagem do filme" />
        </div>
        <div className={`age BG${film.age}`}>{film.age}</div>
      </a>
      {film.premiere && (
        <div className="premiere" data-testid="div-old-movie-premiere">
          <span>Estreia {film.premiere}</span>
        </div>
      )}
      <a className="wrapper-name-movie" href="">
        <span>{film.name}</span>
      </a>
    </div>
  );
};

export default OldMovieCard;
