import { OldFilmsProps } from "../movies-scroll";
import "./styles.scss";

type OldMovieCardProps = {
  film: OldFilmsProps;
};

const OldMovieCard = ({ film }: OldMovieCardProps) => {
  return (
    <div className="movie">
      <a className="wrapper-movie-img" href="">
        <div className="movie-img">
          <img src={film.img} alt="" />
        </div>
        <div className={`age BG${film.age}`}>{film.age}</div>
      </a>
      {film.premiere && (
        <div className="premiere">
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
