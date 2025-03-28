import { MouseEvent, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./styles.scss";

import { maskedUser } from "../../../pages/login";
import ButtonGradient from "../../buttons-styles/button-gradient";
import InputCode from "../input-code";
import { IconArrowCircle, IconCheckCircle } from "../../../icons";

type confirmCodeProps = {
  maskedUser: maskedUser;
  setLoading: (value: boolean) => void;
  setWrongCode: (value: boolean) => void;
  setConfirmCode: (value: boolean) => void;
  handleBackToLogin: () => void;
  navigate: NavigateFunction;
};

const ConfirmCode = ({
  maskedUser,
  setLoading,
  setWrongCode,
  setConfirmCode,
  handleBackToLogin,
  navigate,
}: confirmCodeProps) => {
  const [sentNewCode, setSentNewCode] = useState<boolean>(false);
  const [arrayCode, setArrayCode] = useState(Array(6).fill(""));

  const onConfirmCode = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const code = arrayCode.join("");
    if (code.length == 0) return;

    setLoading(true);
    axios
      .post(`/user/verify-code`, { email: maskedUser.email, code })
      .then((resp) => {
        Cookies.set("token", resp.data, { expires: 10 });
        Cookies.set("info_profile", JSON.stringify({ name: maskedUser.name, email: maskedUser.email }), {
          expires: 10,
        });
        navigate("/minha-conta/meus-pedidos");
      })
      .catch(() => {
        setWrongCode(true);
        setConfirmCode(false);
      })
      .finally(() => setLoading(false));
  };

  const onResendCode = async () => {
    axios
      .get(`/user/resend-code?email=${maskedUser.email}`)
      .then(() => {
        setSentNewCode(true);
      })
      .catch(() => {
        setSentNewCode(false);
      });

    setTimeout(() => {
      setSentNewCode(false);
    }, 30000);
  };

  const onBackToLogin = () => {
    setSentNewCode(false);
    setArrayCode(Array(6).fill(""));
    handleBackToLogin();
  };

  return (
    <div className="wrapper-confirm-code">
      <div className="lock-icon">
        <svg width="71" height="73" fill="none">
          <use xlinkHref="/assets/icons.svg#icon-lock"></use>
        </svg>
      </div>
      <h2>Verifique seu Login</h2>
      <div className="message-sent-email">
        <span>Enviamos um código de confirmação para o e-mail cadastrado</span>
        <br />
        <span>
          <strong>{maskedUser.maskedEmail}</strong>. Digite-o abaixo e clique em Entrar.
        </span>
      </div>
      <InputCode arrayCode={arrayCode} setArrayCode={setArrayCode} />
      <p>Não encontrou o e-mail? Verifique sua caixa de Spam ou a aba Promoções.</p>
      <div className="confirm-email-button">
        <ButtonGradient text="Continuar" handleClickEvent={onConfirmCode} />
      </div>
      {sentNewCode == true ? (
        <div className="sent-new-code">
          <div className="sent-new-code-confirmation" data-testid="sent-new-code">
            <IconCheckCircle />
            <span>Código reenviado!</span>
          </div>
          <span>Nova tentativa em 30 segundos...</span>
        </div>
      ) : (
        <div className="send-again">
          <div className="wrapper-send-click" onClick={onResendCode}>
            <IconArrowCircle />
            <span>Reenviar código</span>
          </div>
        </div>
      )}
      <div className="come-back-button">
        <button onClick={onBackToLogin}>Voltar ao login</button>
      </div>
    </div>
  );
};
export default ConfirmCode;
