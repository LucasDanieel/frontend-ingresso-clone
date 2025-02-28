import { NewFilmsProps } from "../movies-scroll";
import "./styles.scss";

type NewMovieCardProps = {
  film: NewFilmsProps;
};

const NewMovieCard = ({ film }: NewMovieCardProps) => {
  return (
    <div className="wrapper-new-movie">
      <a href="">
        <div className="new-movie">
          <div className="new-movie-img">
            <img src={film.img} alt="" />
            {/* {film.pre_venda && (
              <div className="pre-venda-destaque">
                <span>PRÉ-VENDA</span>
              </div>
            )} */}
          </div>
          <div className="wrapper-info-movie">
            <div className="name-movie">
              <span>CINEMA</span>
              <h3>{film.name}</h3>
            </div>
            <div className="age-movie">
              <div className={`age BG${film.age}`}>{film.age}</div>
              <span>3h35</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default NewMovieCard;
