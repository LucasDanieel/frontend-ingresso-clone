import { MouseEvent } from "react";
import "./styles.scss";

type ButtonTransparentProps = {
  text: string;
  fontBold?: boolean;
  handleClickEvent?: (e: MouseEvent<HTMLButtonElement>) => void;
};
const ButtonTransparent = ({ text, fontBold = false, handleClickEvent = () => {} }: ButtonTransparentProps) => {
  return (
    <button className={`button-transparent ${fontBold ? "font-bold" : ""}`} onClick={handleClickEvent}>
      {text}
    </button>
  );
};

export default ButtonTransparent;
