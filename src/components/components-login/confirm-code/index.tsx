import { ChangeEvent, ClipboardEvent, KeyboardEvent, MouseEvent, useRef, useState } from "react";
import ButtonStyle from "../../button-style";
import { maskedUser } from "../../../pages/login";
import "./styles.scss";

import axios from "axios";
import Cookies from "js-cookie";
import { NavigateFunction } from "react-router-dom";

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
  const codeInputRef = useRef<(HTMLInputElement | null)[]>(Array(6));

  const onCodeChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value == "") {
      const newValues = [...arrayCode];
      newValues[index] = value;
      setArrayCode(newValues);

      if (value !== "" && index < arrayCode.length - 1) {
        (codeInputRef.current[index]?.nextElementSibling as HTMLInputElement)?.focus();
      }
    }
  };

  const onCodeKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && arrayCode[index] === "") {
      (codeInputRef.current[index]?.previousElementSibling as HTMLInputElement)?.focus();
    }
  };

  const onPasteCode = (e: ClipboardEvent) => {
    e.preventDefault();
    const pasteValues = e.clipboardData.getData("text").slice(0, 6).split("");
    const newArrayCode = [...arrayCode];

    pasteValues.forEach((char, idx) => {
      newArrayCode[idx] = char;
    });

    setArrayCode(newArrayCode);

    const firstEmptyInput = newArrayCode.findIndex((x) => x === "");
    const focusIndex = firstEmptyInput !== -1 ? firstEmptyInput : newArrayCode.length - 1;

    if (codeInputRef.current[focusIndex]) {
      codeInputRef.current[focusIndex].focus();
    }
  };

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
        <svg width="71" height="73" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M26.243 25.098c0-4.96 2.62-8.301 7.966-8.301 5.635 0 8.257 2.892 8.256 8.3l.001 8.618H26.243v-8.617ZM52.91 35.645c-.002-1.067-.857-1.93-1.909-1.93H45.87s-.002-8.565-.001-10.117c0-5.45-3.721-10.298-11.72-10.298-7.588 0-11.308 4.849-11.307 10.298l-.001 10.117h-4.736c-1.055 0-1.91.866-1.91 1.934v25.088c0 1.068.855 1.935 1.91 1.935H51.06c1.056 0 1.912-.87 1.91-1.94l-.06-25.087Z"
            fill="#191919"
            fillOpacity="0.3"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="m25.18 31.81.002-9.844c-.001-5.302 3.587-10.02 10.906-10.02 7.714 0 11.305 4.718 11.304 10.02v9.843l-3.281.056-.001-8.44c0-5.262-2.529-8.077-7.964-8.077-5.155 0-7.683 3.25-7.683 8.077v8.44l-3.282-.056Z"
            fill="#999"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M52.95 31.81H19.984c-.67 0-1.215.573-1.215 1.28V58.1c0 1.04.825 1.883 1.842 1.883h32.419c.672 0 1.217-.576 1.214-1.285l-.081-25.613c-.003-.706-.546-1.277-1.215-1.277"
            fill="#999"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M45.95 45.896c0 5.33-4.227 9.651-9.44 9.651-5.214 0-9.44-4.32-9.44-9.65s4.226-9.651 9.44-9.651c5.213 0 9.44 4.32 9.44 9.65"
            fill="#666"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M44.001 45.896c0 4.23-3.354 7.658-7.491 7.658s-7.491-3.428-7.491-7.658 3.354-7.658 7.49-7.658c4.138 0 7.492 3.429 7.492 7.658"
            fill="#252525"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M39.792 39.002c3.717 1.859 5.256 6.445 3.438 10.244-1.819 3.8-6.305 5.373-10.021 3.514-3.717-1.858-5.255-6.445-3.438-10.244 1.819-3.8 6.305-5.373 10.021-3.514"
            fill="#CCC"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M35.687 45.901a1.787 1.787 0 0 1-.76-1.478c.005-.983.787-1.775 1.748-1.77.961.005 1.736.805 1.731 1.788a1.787 1.787 0 0 1-.711 1.425v3.453H35.67l.017-3.418Z"
            fill="#191919"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M35.253 44.424c.002-.386.15-.748.419-1.02.267-.27.62-.418.995-.418h.007c.78.004 1.41.656 1.407 1.453a1.444 1.444 0 0 1-.579 1.158.335.335 0 0 0-.133.269v3.119h-1.37l.014-3.082a.336.336 0 0 0-.142-.277c-.39-.272-.62-.721-.618-1.202"
            fill="#191919"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M35.439 49.553a.324.324 0 0 0 .231.098h2.025a.33.33 0 0 0 .326-.333v-3.292c.445-.397.709-.977.712-1.584.005-1.165-.917-2.117-2.056-2.123h-.01c-.549 0-1.064.217-1.454.612a2.12 2.12 0 0 0-.612 1.49 2.13 2.13 0 0 0 .759 1.646l-.016 3.25a.34.34 0 0 0 .095.236M41.185 37.888a9.099 9.099 0 0 1 2.502 2.26.324.324 0 0 0 .458.058.338.338 0 0 0 .056-.468 9.752 9.752 0 0 0-2.681-2.422.323.323 0 0 0-.448.115.338.338 0 0 0 .113.457"
            fill="#191919"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M45.902 46.839a.33.33 0 0 0-.367.286 9.446 9.446 0 0 1-.848 2.85c-1.07 2.236-2.927 3.912-5.23 4.72a8.876 8.876 0 0 1-6.962-.444c-4.514-2.258-6.39-7.85-4.182-12.464 2.066-4.318 7.111-6.334 11.486-4.593a.323.323 0 0 0 .422-.19.335.335 0 0 0-.185-.43c-4.688-1.868-10.095.293-12.31 4.92-2.365 4.945-.355 10.936 4.482 13.355a9.555 9.555 0 0 0 4.284 1.022 9.593 9.593 0 0 0 3.177-.546c2.468-.865 4.458-2.661 5.604-5.057a10.14 10.14 0 0 0 .909-3.054.332.332 0 0 0-.28-.375M45.678 43.658a.333.333 0 0 0-.25.396c.083.383.142.775.176 1.165a.329.329 0 0 0 .324.303l.03-.001a.332.332 0 0 0 .295-.362 10.32 10.32 0 0 0-.187-1.247.326.326 0 0 0-.389-.254M45.19 43.07a.327.327 0 0 0 .41.218.335.335 0 0 0 .212-.418 10.19 10.19 0 0 0-.746-1.787.323.323 0 0 0-.442-.133.338.338 0 0 0-.13.453c.284.53.518 1.091.696 1.668"
            fill="#191919"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M43.78 47.722a.328.328 0 0 0 .384-.261c.115-.579.166-1.173.152-1.766a.33.33 0 0 0-.326-.325h-.007a.33.33 0 0 0-.319.342 7.48 7.48 0 0 1-.139 1.617.333.333 0 0 0 .255.393M43.848 44.727a.333.333 0 0 0 .32-.398 8.17 8.17 0 0 0-1.21-2.953 7.923 7.923 0 0 0-.948-1.167.322.322 0 0 0-.461.002.34.34 0 0 0 .001.472 7.282 7.282 0 0 1 1.503 2.237 7.53 7.53 0 0 1 .476 1.538.328.328 0 0 0 .32.269M29.478 42.37a8.103 8.103 0 0 0-.373 6.104c.678 2.019 2.084 3.647 3.96 4.585a7.648 7.648 0 0 0 3.428.818 7.67 7.67 0 0 0 2.543-.437c1.975-.692 3.568-2.13 4.486-4.048.079-.165.152-.33.218-.498a.336.336 0 0 0-.178-.434.324.324 0 0 0-.425.182 7.651 7.651 0 0 1-.2.457c-.842 1.758-2.302 3.076-4.112 3.71a6.976 6.976 0 0 1-5.474-.349 7.227 7.227 0 0 1-3.628-4.203 7.423 7.423 0 0 1 .34-5.595c1.737-3.628 6.037-5.136 9.586-3.36.198.098.394.208.582.325a.322.322 0 0 0 .448-.112.337.337 0 0 0-.11-.458 7.864 7.864 0 0 0-.634-.355c-3.872-1.936-8.563-.291-10.457 3.667"
            fill="#191919"
          ></path>
          <g opacity="0.2" fillRule="evenodd" clipRule="evenodd" fill="#fff">
            <path d="M36.148 15.348c5.434 0 7.964 2.814 7.963 8.076v8.441l3.283-.056-.001-9.844c0-5.302-3.59-10.02-11.304-10.02l.059 3.402Z"></path>
            <path d="m53.604 31.809-16.938.056v28.118h16.979c.333 0 .603-.576.601-1.285l-.04-25.613c-.001-.706-.27-1.276-.602-1.276"></path>
          </g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M52.401 59.317H20.614c-.656 0-1.19-.545-1.19-1.216v-24.41c0-.67.534-1.215 1.19-1.215h31.73c.654 0 1.188.544 1.19 1.213l.056 24.41c.001.325-.122.63-.347.861a1.17 1.17 0 0 1-.842.357Zm-8.942-28.175H29.116v-7.717c0-2.271.6-4.137 1.736-5.396 1.205-1.337 2.986-2.014 5.296-2.014 2.493 0 4.362.628 5.555 1.866 1.165 1.21 1.756 3.075 1.756 5.544v7.717ZM28.351 15.44c1.82-1.85 4.495-2.828 7.738-2.828 3.42 0 6.218.98 8.092 2.835 1.651 1.634 2.56 3.949 2.56 6.519v9.176h-1.977v-7.717c0-2.832-.717-5.012-2.132-6.48-1.447-1.502-3.628-2.264-6.484-2.264-2.689 0-4.793.822-6.255 2.444-1.361 1.51-2.08 3.689-2.08 6.3l-.001 7.717h-1.978c0-2.002.002-7.926.001-9.177 0-2.557.893-4.875 2.516-6.525Zm26.487 18.245c-.004-1.402-1.122-2.543-2.494-2.543h-4.298v-9.176c0-2.934-1.05-5.59-2.958-7.478-2.122-2.1-5.234-3.209-8.999-3.209-3.595 0-6.589 1.112-8.657 3.216-1.872 1.902-2.902 4.556-2.901 7.47v9.177h-3.917c-1.376 0-2.494 1.144-2.494 2.55v24.41c0 1.405 1.118 2.549 2.494 2.549H52.4c.667 0 1.294-.267 1.765-.749.471-.483.73-1.125.729-1.807l-.057-24.41Z"
            fill="#191919"
          ></path>
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
      <div className="code-input">
        {arrayCode.map((value, index) => (
          <input
            key={index}
            type="text"
            value={value}
            maxLength={1}
            placeholder="__"
            onChange={(e) => onCodeChange(e, index)}
            onKeyDown={(e) => onCodeKeyDown(e, index)}
            onPaste={onPasteCode}
            ref={(el) => (codeInputRef.current[index] = el)}
          />
        ))}
      </div>
      <p>Não encontrou o e-mail? Verifique sua caixa de Spam ou a aba Promoções.</p>
      <div className="confirm-email-button">
        <ButtonStyle text="Continuar" isButton handleClickEvent={onConfirmCode} />
      </div>
      {sentNewCode == true ? (
        <div className="sent-new-code">
          <div className="sent-new-code-confirmation">
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
          <div className="wrraper-send-click" onClick={onResendCode}>
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
