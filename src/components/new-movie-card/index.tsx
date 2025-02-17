import { NewFilmsProps } from "../movies-scroll";
import "./styles.scss";

type NewMovieCardProps = {
  film: NewFilmsProps;
};

const NewMovieCard = ({ film }: NewMovieCardProps) => {
  return (
    <div className="new-wrapper-movie">
      <a href="">
        <div className={`new-movie ${film.pre_venda ? "pre-venda" : ""}`}>
          <div className="new-movie-img">
            <img src={film.img} alt="" />
            {film.pre_venda && (
              <div className="pre-venda-destaque">
                <span>PRÉ-VENDA</span>
              </div>
            )}
          </div>
          <div className="wrapper-info-movie">
            <h3>{film.name}</h3>
            <span>{film.description}</span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default NewMovieCard;
