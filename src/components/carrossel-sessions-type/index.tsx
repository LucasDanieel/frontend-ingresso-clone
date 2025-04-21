import { MouseEvent, useRef } from "react";
import "./styles.scss";
import { mouse_down, mouse_move, mouse_up } from "../../utils/scroll-methods";

const CarrosselSessionsType = () => {
  const refScroll = useRef<HTMLDivElement>(null);

  const mouseMove = (e: MouseEvent<HTMLDivElement>) => {
    mouse_move(e, refScroll);
  };

  const mouseDown = (e: MouseEvent<HTMLDivElement>) => {
    mouse_down(e, refScroll);
  };

  const mouseUp = () => {
    mouse_up(refScroll);
  };

  return (
    <div
      className="wrapper-sessions-type"
      onMouseDown={mouseDown}
      onMouseMove={mouseMove}
      onMouseUp={mouseUp}
      onMouseLeave={mouseUp}
      ref={refScroll}
    >
      <div className="sessions-type">Normal</div>
    </div>
  );
};

export default CarrosselSessionsType;
