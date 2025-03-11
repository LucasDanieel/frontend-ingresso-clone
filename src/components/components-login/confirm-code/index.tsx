import { MouseEvent, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./styles.scss";

import { maskedUser } from "../../../pages/login";
import ButtonGradient from "../../buttons-styles/button-gradient";
import InputCode from "../input-code";

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-check2-circle"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
              <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
            </svg>
            <span>Código reenviado!</span>
          </div>
          <span>Nova tentativa em 30 segundos...</span>
        </div>
      ) : (
        <div className="send-again">
          <div className="wrapper-send-click" onClick={onResendCode}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-repeat"
              viewBox="0 0 16 16"
            >
              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
              <path
                fillRule="evenodd"
                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
              />
            </svg>
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
