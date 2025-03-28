import "./styles.scss";

type premiereBannerProps = {
  film: {
    img: string;
    age: string | number;
    type: string;
    name: string;
    description: string;
    premiere: string | null;
    pre_venda: boolean;
  };
};

const PremiereBanner = ({ film }: premiereBannerProps) => {
  return (
    <div className="premiere-films">
      <img src={film.img} alt="Imagem do filme" />
      <a className="container-description" href="">
        <div className="wrapper-description">
          {film.premiere && (
            <div className="wrapper-tags">
              <span>ESTREIA {film.premiere}</span>
              <span>PRÉ-VENDA</span>
            </div>
          )}
          <div className="wrapper-age">
            <div className={`age BG${film.age}`}>{film.age}</div>
            <span>{film.type}</span>
          </div>
          <h2>{film.name}</h2>
          {/* <span className="description-premiere-films">{film.description}</span> */}
        </div>
      </a>
    </div>
  );
};

export default PremiereBanner;
