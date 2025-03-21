import ButtonGradient from "../../buttons-styles/button-gradient";
import ButtonTransparent from "../../buttons-styles/button-transparent";
import "./styles.scss";

type bannerProps = {
  film: { img: string; age: string | number; type: string; name: string; description: string };
};

const Banner = ({ film }: bannerProps) => {
  return (
    <div className="banner">
      <img src={film.img} alt="Banner do filme" />
      <a className="container-description" href="">
        <div className="wrapper-description">
          <div className="wrapper-age">
            <div className={`age BG${film.age}`}>{film.age}</div>
            <span>{film.type}</span>
          </div>
          <h1>{film.name}</h1>
          <span className="description">{film.description}</span>
        </div>
      </a>
      <div className="wrapper-ticket">
        <div className="ticket">
          <ButtonGradient text="Ingressos" />
        </div>
        <div className="watch-trailer">
          <ButtonTransparent text="Assistir Trailer" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
