import { MouseEvent } from "react";
import "./styles.scss";

type ButtonGradient = {
  text: string;
  disabled?: boolean;
  fontBold?: boolean;
  handleClickEvent?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const ButtonGradient = ({ text, disabled = false, fontBold = false, handleClickEvent = () => {} }: ButtonGradient) => {
  return (
    <button
      onClick={handleClickEvent}
      className={`button-gradient ${fontBold ? "font-bold" : ""}`}
      disabled={disabled}
      type="button"
    >
      {text}
    </button>
  );
};

export default ButtonGradient;
