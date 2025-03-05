import { Dispatch, SetStateAction } from "react";

import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import "./styles.scss";

type recaptchaComponentProps = {
  setReCAPTCHA: Dispatch<SetStateAction<string | null>>;
  alignCenter?: boolean;
  no_margin?: boolean;
};

const recaptcha_key: string = import.meta.env.VITE_RECAPTCHA_KEY;

const RecaptchaComponent = ({ setReCAPTCHA, alignCenter = true, no_margin = false }: recaptchaComponentProps) => {
  const onChangeReCAPTCHA = (token: string | null) => {
    axios
      .get(`/recaptcha/validate?token_recaptcha=${token}`)
      .then(() => {
        setReCAPTCHA(token);
      })
      .catch(() => {
        setReCAPTCHA(null);
      });
  };

  return (
    <div className={`wrapper-recaptcha ${alignCenter ? "align-center" : "not-align"} ${no_margin ? "no-margin" : ""}`}>
      <p>
        {"Este site é protegido pelo reCAPTCHA e pelo Google aplicando as seguintes "}
        <a href="https://policies.google.com/privacy" target="_blank">
          Políticas de Segurança
        </a>
        {" e "}
        <a href="https://policies.google.com/terms" target="_blank">
          Termos de Serviço.
        </a>
      </p>
      <ReCAPTCHA sitekey={recaptcha_key} onChange={onChangeReCAPTCHA} />
    </div>
  );
};

export default RecaptchaComponent;
