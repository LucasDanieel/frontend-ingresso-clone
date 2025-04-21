import { IconSeats } from "../../../icons";
import IconPrice from "../../../icons/cinemas/icon-price";
import "./styles.scss";

const WrapperSessionDescriptionHeader = () => {
  return (
    <div className="wrapper-session-description-header">
      <div className="session-description-header-title">
        <a href="/filme/{slug-do-filme}">
          <h3>Branca De Neve</h3>
        </a>
        <span>1h49</span>
      </div>
      <div className="session-description-header-icons">
        <div className="icon-session-description">
          <IconSeats />
          <span>Assentos</span>
        </div>
        <div className="icon-session-description">
          <IconPrice />
          <span>Preços</span>
        </div>
      </div>
    </div>
  );
};

export default WrapperSessionDescriptionHeader;
