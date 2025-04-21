import { MouseEvent, useRef, useState } from "react";
import "./styles.scss";
import { mouse_down, mouse_move, mouse_up, move_left, move_right } from "../../utils/scroll-methods";
import { IconArrowLeftBig, IconArrowRightBig } from "../../icons";

const CarrosselSwitchDate = () => {
  const [hiddenBefore, setHiddenBefore] = useState<boolean>(true);
  const [hiddenAfter, setHiddenAfter] = useState<boolean>(false);

  const refScroll = useRef<HTMLDivElement>(null);

  const mouseMove = (e: MouseEvent<HTMLDivElement>) => {
    mouse_move(e, refScroll);
  };

  const mouseDown = (e: MouseEvent<HTMLDivElement>) => {
    mouse_down(e, refScroll);
  };

  const mouseUp = () => {
    mouse_up(refScroll, setHiddenBefore, setHiddenAfter);
  };

  return (
    <div className="container-carrossel-switch-date">
      <div
        className={`wrapper-carrossel-buttons${hiddenBefore ? " hidden-before" : ""}${
          hiddenAfter ? " hidden-after" : ""
        }`}
      >
        <button className="left" onClick={() => move_left(refScroll, setHiddenBefore, setHiddenAfter)}>
          <IconArrowLeftBig />
        </button>
        <button className="right" onClick={() => move_right(refScroll, setHiddenBefore, setHiddenAfter)}>
          <IconArrowRightBig />
        </button>
      </div>
      <div
        className="carrossel-switch-date"
        onMouseDown={mouseDown}
        onMouseMove={mouseMove}
        onMouseUp={mouseUp}
        onMouseLeave={mouseUp}
        ref={refScroll}
      >
        <div className="contente-switch-date selected">
          <div className="contente">
            <span className="date">HOJE</span>
            <span>15/04</span>
          </div>
        </div>
        <div className="contente-switch-date">
          <div className="contente">
            <span className="date">QUA</span>
            <span>16/04</span>
          </div>
        </div>
        <div className="contente-switch-date">
          <div className="contente">
            <span className="date">QUI</span>
            <span>17/04</span>
          </div>
        </div>
        <div className="contente-switch-date">
          <div className="contente">
            <span className="date">SEX</span>
            <span>18/04</span>
          </div>
        </div>
        <div className="contente-switch-date">
          <div className="contente">
            <span className="date">SAB</span>
            <span>19/04</span>
          </div>
        </div>
        {/* <div className="contente-switch-date">
          <div className="contente">
            <span className="date">DOM</span>
            <span>20/04</span>
          </div>
        </div>
        <div className="contente-switch-date">
          <div className="contente">
            <span className="date">SEG</span>
            <span>21/04</span>
          </div>
        </div>
        <div className="contente-switch-date">
          <div className="contente">
            <span className="date">TER</span>
            <span>22/04</span>
          </div>
        </div>
        <div className="contente-switch-date">
          <div className="contente">
            <span className="date">QUA</span>
            <span>23/04</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CarrosselSwitchDate;
