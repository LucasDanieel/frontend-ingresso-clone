import { IconHeart, IconPhone, IconPointMap, IconPopcorn } from "../../../icons";
import "./styles.scss";

const HeaderCinema = () => {
  return (
    <div className="container-header-cinema">
      <div className="wrapper-header-cinema">
        <div className="relative-header-cinema">
          <div className="background-image">
            <img src="\assets\img\placeholder-movie-banner.webp" alt="imagem background" />
          </div>
          <div className="header-cinema">
            <div className="header-cinema-logo">
              <img src="https://ingresso-a.akamaihd.net/prd/img/cinema/avatar/avatarcorporation_1.svg" alt="" />
            </div>
            <div className="header-cinema-information">
              <div className="header-cinema-name">
                <h3>Cinemark Campo Grande</h3>
                <IconHeart />
              </div>
              <div className="header-cinema-address">
                <span>Av. Afonso Pena, 4909 - Santa Fé, Campo Grande</span>
              </div>
              <div className="header-cinema-map">
                <IconPointMap />
                <p>Ver no mapa</p>
              </div>
              <div className="header-cinema-services">
                <div className="services-icon">
                  <IconPopcorn />
                </div>
                <div className="services-icon">
                  <IconPhone />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderCinema;
