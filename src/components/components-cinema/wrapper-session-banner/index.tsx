import { IconPlay } from '../../../icons';
import './styles.scss';

const WrapperSessionBanner = () => {
  return (
    <div className="wrapper-session-image">
        <img
          src="https://ingresso-a.akamaihd.net/prd/img/movie/branca-de-neve/6b185129-45c5-4acf-8cc1-3a232ec97535.webp"
          alt="Imagem do filme da sessão"
        />
        <div className={`age BG10`}>10</div>
        <div className="icon-play-session-image">
          <IconPlay />
        </div>
      </div>
  );
};

export default WrapperSessionBanner;