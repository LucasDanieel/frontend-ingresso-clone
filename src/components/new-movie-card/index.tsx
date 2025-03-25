import { FilmsProps } from "../../@types/movie";
import "./styles.scss";

const NewMovieCard = ({ film }: { film: FilmsProps }) => {
  return (
    <div className="wrapper-new-movie">
      <a href="">
        <div className={`new-movie ${film.pre_venda ? "pre-venda" : ""}`}>
          <div className="new-movie-img">
            <img src={film.img} alt="" />
          </div>
          <div className="wrapper-info-movie">
            <div className="name-movie">
              {film.pre_venda ? (
                <div className="pre-venda-destaque">
                  <p>CINEMA | PRÉ-VENDA</p>
                </div>
              ) : (
                <p>CINEMA</p>
              )}
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
