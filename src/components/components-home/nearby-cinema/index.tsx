import { MouseEvent, useRef, useState } from "react";
import "./styles.scss";

const NearbyCinema = () => {
  const [hiddenBefore, setHiddenBefore] = useState<boolean>(true);
  const [hiddenAfter, setHiddenAfter] = useState<boolean>(false);
  const [hiddenAtiveLocation, setHiddenAtiveLocation] = useState<boolean>(true);

  const refCinemaScroll = useRef<HTMLDivElement>(null);

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
  ];

  const move_left = () => {
    refCinemaScroll.current?.scrollBy({ left: -530, behavior: "smooth" });
    setTimeout(() => {
      if (refCinemaScroll.current) {
        if (refCinemaScroll.current.scrollLeft <= 0) setHiddenBefore(true);
      }
    }, 500);

    setHiddenAfter(false);
  };

  const move_right = () => {
    refCinemaScroll.current?.scrollBy({ left: 530, behavior: "smooth" });
    setTimeout(() => {
      if (refCinemaScroll.current) {
        const total = refCinemaScroll.current.scrollLeft + refCinemaScroll.current.clientWidth;
        if (total >= refCinemaScroll.current.scrollWidth) setHiddenAfter(true);
      }
    }, 500);

    setHiddenBefore(false);
  };

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let velocity = 0;
  let lastMouseX = 0;
  let lastTime = 0;
  let inertiaInterval: number;

  const applyInertia = () => {
    if (Math.abs(velocity) > 0.1) {
      (refCinemaScroll.current as HTMLElement).scrollLeft -= velocity;
      velocity *= 0.8;
      if (isFinite(velocity) == false) velocity = 0;
    } else {
      clearInterval(inertiaInterval);

      if (refCinemaScroll.current) {
        const total = refCinemaScroll.current.scrollLeft + refCinemaScroll.current.clientWidth;
        if (total >= refCinemaScroll.current.scrollWidth) {
          setHiddenAfter(true);
        } else {
          setHiddenAfter(false);
        }

        if (refCinemaScroll.current.scrollLeft <= 0) {
          setHiddenBefore(true);
        } else {
          setHiddenBefore(false);
        }
      }
    }
  };

  const mouseMove = (e: MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();

    if (refCinemaScroll.current) {
      (refCinemaScroll.current as HTMLElement).classList.add("active");
      const x = e.pageX;
      const walk = x - startX;
      refCinemaScroll.current.scrollLeft = scrollLeft - walk;

      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      velocity = ((x - lastMouseX) / deltaTime) * 30;

      lastMouseX = x;
      lastTime = currentTime;
    }
  };

  const mouseDown = (e: MouseEvent) => {
    isDown = true;

    if (refCinemaScroll.current) {
      startX = e.pageX;
      scrollLeft = refCinemaScroll.current.scrollLeft;
      lastMouseX = e.pageX;
      lastTime = Date.now();
      clearInterval(inertiaInterval);
    }
  };

  const mouseUp = () => {
    isDown = false;

    clearInterval(inertiaInterval);
    inertiaInterval = setInterval(applyInertia, 16);

    if (refCinemaScroll.current) {
      (refCinemaScroll.current as HTMLElement).classList.remove("active");
    }
  };

  return (
    <div className="container-cinemas">
      <a href="">
        <div className="title-link">
          <h3>Cinemas próximos a você</h3>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 3 11 10">
            <path d="m2.828 15.555 7.777-7.779L2.828 0 0 2.828l4.949 4.948L0 12.727l2.828 2.828z" />
          </svg>
        </div>
      </a>
      <div
        className={`container-nearby-cinema${hiddenBefore ? " hidden-before" : ""}${
          hiddenAfter ? " hidden-after" : ""
        }`}
      >
        <div className="wrapper-buttons">
          <button className="left" onClick={move_left}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-left"
              viewBox="1 3 10 10"
            >
              <path
                fillRule="evenodd"
                stroke="currentColor"
                strokeWidth="0.4"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
              />
            </svg>
          </button>
          <button className="right" onClick={move_right}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-right"
              viewBox="3 3 10 10"
            >
              <path
                fillRule="evenodd"
                stroke="currentColor"
                strokeWidth="0.4"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
              />
            </svg>
          </button>
        </div>
        <div
          className="nearby-cinema-scroll"
          ref={refCinemaScroll}
          onMouseDown={mouseDown}
          onMouseMove={mouseMove}
          onMouseUp={mouseUp}
          onMouseLeave={mouseUp}
        >
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          className="bi bi-geo-alt"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                          <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>
                        <span>{cine.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="show-more">
                  <h3>Ver programação</h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="11" viewBox="0 3 11 10">
                    <path d="m2.828 15.555 7.777-7.779L2.828 0 0 2.828l4.949 4.948L0 12.727l2.828 2.828z" />
                  </svg>
                </div>
              </a>
              <div className="icon-heart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-heart"
                  viewBox="0 0 16 16"
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                </svg>
              </div>
              {!hiddenAtiveLocation && (
                <div className="wrapper-location">
                  <div className="location">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="bi bi-geo-alt"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                      <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    </svg>
                    <span>
                      <span className="span-blue">ative sua localização</span> para encontrar os
                      cinemas mais próximos de você
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NearbyCinema;
