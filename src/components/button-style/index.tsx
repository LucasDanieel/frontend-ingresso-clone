import "./styles.scss";
import { MouseEvent } from "react";

type ButtonStyleProps = {
  text: string;
  url?: string;
  style_width?: boolean;
  medio?: boolean;
  small?: boolean;
  login_create?: boolean;
  isButton?: boolean;
  handleClickEvent?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const ButtonStyle = ({
  text,
  url = "",
  style_width = false,
  medio = false,
  small = false,
  login_create = false,
  isButton = false,
  handleClickEvent = () => {},
}: ButtonStyleProps) => {
  if (isButton) {
    return (
      <button onClick={handleClickEvent} className="button-style">
        {text}
      </button>
    );
  }

  return (
    <a
      href={url}
      className={`link-style ${style_width ? "style-width" : "style-padding"} ${medio ? "medio" : ""} ${
        small ? "small" : ""
      } ${login_create ? "style-login-create" : ""}`}
    >
      {text}
    </a>
  );
};

export default ButtonStyle;
