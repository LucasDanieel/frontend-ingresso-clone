import { useState } from "react";
import "./styles.scss";

import WrapperScroll from "../wrapper-scroll";
import { IconArrowRight, IconHeart, IconPointMap } from "../../../icons";

const NearbyCinema = () => {
  const [hiddenAtiveLocation, setHiddenAtiveLocation] = useState<boolean>(true);

  const array = [
    {
      name: "Cinépolis Norte Sul Plaza",
      location: "Av. Pres. Ernesto Geisel, 2300",
      img: "https://ingresso-a.akamaihd.net/img/cinema/avatar/avatarcorporation_5.svg",
    },
    {
      name: "Cinemark Campo Grande",
      location: "Av. Afonso Pena, 4909",
      img: "https://ingresso-a.akamaihd.net/img/cinema/avatar/avatarcorporation_1.svg",
    },
    {
      name: "UCI Bosque dos Ipes",
      location: "Av Consul Assaf Trad, 4796",
      img: "https://ingresso-a.akamaihd.net/img/cinema/avatar/avatarcorporation_3.svg",
    },
    // {
    //   name: "Cinépolis Norte Sul Plaza",
    //   location: "Av. Pres. Ernesto Geisel, 2300",
    //   img: "https://ingresso-a.akamaihd.net/img/cinema/avatar/avatarcorporation_5.svg",
    // },
    // {
    //   name: "Cinemark Campo Grande",
    //   location: "Av. Afonso Pena, 4909",
    //   img: "https://ingresso-a.akamaihd.net/img/cinema/avatar/avatarcorporation_1.svg",
    // },
    // {
    //   name: "UCI Bosque dos Ipes",
    //   location: "Av Consul Assaf Trad, 4796",
    //   img: "https://ingresso-a.akamaihd.net/img/cinema/avatar/avatarcorporation_3.svg",
    // },
  ];

  return (
    <WrapperScroll title="Cinemas próximos a você" title_link nearby_cinema>
      {array.map((cine, idx) => (
        <div className="wrapper-nearby-cinema" key={idx}>
          <a href="" className="nearby-cinema">
            <div className="cinema">
              <div className="cinema-info">
                <div className="cinema-logo">
                  <img src={cine.img} alt="" />
                </div>
                <div className="cinema-name">
                  <h3>{cine.name}</h3>
                  <div className="cinema-location">
                    <IconPointMap />
                    <span>{cine.location}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="show-more">
              <h3>Ver programação</h3>
              <IconArrowRight />
            </div>
          </a>
          <div className="icon-heart">
            <IconHeart />
          </div>
          {!hiddenAtiveLocation && (
            <div className="wrapper-location">
              <div className="location">
                <IconPointMap />
                <span>
                  <span className="span-blue">ative sua localização</span> para encontrar os cinemas mais próximos de
                  você
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </WrapperScroll>
  );
};

export default NearbyCinema;
