import { MouseEvent, ReactNode, useRef, useState } from "react";
import "./styles.scss";
import { mouse_down, mouse_move, mouse_up, move_left, move_right } from "../../../utils/scroll-methods";
import { IconArrowLeftBig, IconArrowRight, IconArrowRightBig } from "../../../icons";

type WrapperScrollProps = {
  title: string;
  title_link?: boolean;
  nearby_cinema?: boolean;
  promotion?: boolean;
  children: ReactNode;
};

export type paginationProps = {
  isActive: boolean;
};

const WrapperScroll = ({
  title,
  title_link = false,
  nearby_cinema = false,
  promotion = false,
  children,
}: WrapperScrollProps) => {
  const [hiddenBefore, setHiddenBefore] = useState<boolean>(true);
  const [hiddenAfter, setHiddenAfter] = useState<boolean>(false);

  const refMovieScroll = useRef<HTMLDivElement>(null);

  const mouseMove = (e: MouseEvent<HTMLDivElement>) => {
    mouse_move(e, refMovieScroll);
  };

  const mouseDown = (e: MouseEvent<HTMLDivElement>) => {
    mouse_down(e, refMovieScroll);
  };

  const mouseUp = () => {
    mouse_up(refMovieScroll, setHiddenBefore, setHiddenAfter, pagination, setPagination);
  };

  const [pagination, setPagination] = useState<paginationProps[]>([
    { isActive: true },
    { isActive: false },
    { isActive: false },
  ]);

  const controlPagination = (idx: number) => {
    const element = refMovieScroll.current as HTMLElement;

    if (idx == 0) {
      element.scrollTo({ left: 0, behavior: "smooth" });
      setHiddenBefore(true);
    } else if (idx == 1) {
      element.scrollTo({ left: element.scrollWidth / 2 - element.clientWidth / 2, behavior: "smooth" });
      setHiddenBefore(false);
      setHiddenAfter(false);
    } else {
      element.scrollTo({ left: element.scrollWidth, behavior: "smooth" });
      setHiddenBefore(false);
      setHiddenAfter(true);
    }

    const newPagination = pagination.map((value, index) => {
      if (index == idx) value.isActive = true;
      else value.isActive = false;
      return value;
    });

    setPagination(newPagination);
  };

  return (
    <div className="container-movie-scroll">
      {title_link ? (
        <a href="">
          <div className={`title-link ${nearby_cinema ? "nearby-cinema" : ""} ${promotion ? "promotion" : ""}`}>
            <h3>{title}</h3>
            <IconArrowRight />
          </div>
        </a>
      ) : (
        <div className="title">
          <h3>{title}</h3>
          <div className="pagination-dots">
            {pagination.map((value, idx) => (
              <button
                className={`${value.isActive ? "active" : ""}`}
                key={idx}
                onClick={() => controlPagination(idx)}
              />
            ))}
          </div>
        </div>
      )}
      <div
        className={`wrapper-movie-scroll ${hiddenBefore ? "hidden-before" : ""} ${hiddenAfter ? "hidden-after" : ""}`}
      >
        <div className="wrapper-buttons">
          <button className="left" onClick={() => move_left(refMovieScroll, setHiddenBefore, setHiddenAfter)}>
            <IconArrowLeftBig />
          </button>
          <button className="right" onClick={() => move_right(refMovieScroll, setHiddenBefore, setHiddenAfter)}>
            <IconArrowRightBig />
          </button>
        </div>
        <div
          className="movie-scroll"
          ref={refMovieScroll}
          onMouseDown={mouseDown}
          onMouseMove={mouseMove}
          onMouseUp={mouseUp}
          onMouseLeave={mouseUp}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default WrapperScroll;
