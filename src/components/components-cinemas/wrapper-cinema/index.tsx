import { Link } from "react-router-dom";
import { cinemaProps } from "../../../@types/cinema";
import { IconHeart, IconPhone, IconPopcorn } from "../../../icons";
import "./styles.scss";

type wrapperCinemaProps = {
  cinema: cinemaProps;
};

const WrapperCinema = ({ cinema }: wrapperCinemaProps) => {
  return (
    <div className="container-box-cinema">
      <div className="icon-box-cinema">
        <IconHeart />
      </div>
      <Link to={`/cinema/${cinema.slug}`}>
        <div className="box-cinema">
          <h3>{cinema.name}</h3>
          <span>
            {cinema.street}, {cinema.number} - {cinema.neighborhood}
          </span>
        </div>
      </Link>
      <div className="icon-information-cinema">
        {cinema.sellProduct && <IconPopcorn />}
        {cinema.mobileTicket && <IconPhone />}
      </div>
    </div>
  );
};

export default WrapperCinema;
