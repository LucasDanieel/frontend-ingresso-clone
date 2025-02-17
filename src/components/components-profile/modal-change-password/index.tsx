import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./styles.scss";

import { requiredInPassword } from "../../../pages/create";
import ValidPassword from "../../components-create-login/valid-password";
import SimpleInput from "../../form-inputs/simple-input";
import RecaptchaComponent from "../../components-create-login/recaptcha-component";
import ButtonStyle from "../../button-style";
import { validInputPassword } from "../../../utils/input-methods";
import { useNavigate } from "react-router-dom";

type changePasswordProps = { email: string; setOpenModalChangePassword: Dispatch<SetStateAction<boolean>> };

const backend_url = import.meta.env.VITE_URL_BACKEND;

const ModalChangePassword = ({ email, setOpenModalChangePassword }: changePasswordProps) => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const [requiredInPassword, setRequiredInPassword] = useState<requiredInPassword>({
    letraMinuscula: false,
    letraMaiuscula: false,
    hasNumber: false,
    minimumLength: false,
  });
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [reCAPTCHA, setReCAPTCHA] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [loginAgain, setLoginAgain] = useState<boolean>(false);

  const [inputCurrentPasswordWrong, setInputCurrentPasswordWrong] = useState<boolean>(false);
  const [inputNewPasswordWrong, setInputNewPasswordWrong] = useState<boolean>(false);
  const [inputConfirmNewPasswordWrong, setInputConfirmNewPasswordWrong] = useState<boolean>(false);

  const [errorMessageCurrentPassword, setErrorMessageCurrentPassword] = useState<string>("");
  const [errorMessageNewPassword, setErrorMessageNewPassword] = useState<string>("");
  const [errorMessageConfirmNewPassword, setErrorMessageConfirmNewPassword] = useState<string>("");

  const inputCurrentPasswordRef = useRef<HTMLInputElement>(null);
  const inputNewPasswordRef = useRef<HTMLInputElement>(null);
  const inputConfirmNewPasswordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const onChangeCurrentPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length > 0) setInputCurrentPasswordWrong(false);
    else {
      setInputCurrentPasswordWrong(true);
      setErrorMessageCurrentPassword("Por favor, digite sua senha.");
    }

    setCurrentPassword(value);
  };

  const onBlurCurrentPassword = () => {
    if (currentPassword.length == 0) {
      setInputCurrentPasswordWrong(true);
      setErrorMessageCurrentPassword("Por favor, digite sua senha.");
    }
  };

  const onChangeNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 0) {
      setErrorMessageNewPassword("A senha não atende aos critérios necessários.");
    } else {
      setErrorMessageNewPassword("Por favor, digite uma senha.");
    }

    if (value != confirmNewPassword) {
      setInputConfirmNewPasswordWrong(true);
      setErrorMessageConfirmNewPassword("Senhas não coincidem.");
    } else {
      setInputConfirmNewPasswordWrong(false);
    }

    const isValidPassword = validInputPassword(value, setRequiredInPassword);
    if (isValidPassword) {
      setInputNewPasswordWrong(false);
      setPasswordValid(true);
    } else {
      setInputNewPasswordWrong(true);
      setPasswordValid(false);
    }

    setNewPassword(value);
  };

  const onBlurNewPassword = () => {
    if (newPassword.length == 0) {
      setInputNewPasswordWrong(true);
      setErrorMessageNewPassword("Por favor, digite uma senha.");
    }
  };

  const onChangeConfirmNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value != newPassword) {
      setInputConfirmNewPasswordWrong(true);
      setErrorMessageConfirmNewPassword("Senhas não coincidem.");
    } else if (value.length == 0) {
      setInputConfirmNewPasswordWrong(true);
      setErrorMessageConfirmNewPassword("Por favor, digite a confirmação da senha.");
    } else {
      setInputConfirmNewPasswordWrong(false);
    }

    setConfirmNewPassword(value);
  };

  const onBlurConfirmNewPassword = () => {
    if (confirmNewPassword.length == 0) {
      setInputConfirmNewPasswordWrong(true);
      setErrorMessageConfirmNewPassword("Por favor, digite a confirmação da senha.");
    }
  };

  const onSubmit = () => {
    const isValid = validInputs();

    if (isValid == false) return;

    const changePasswordDTO = {
      email: email,
      oldPassword: currentPassword,
      newPassword,
    };

    setLoading(true);
    axios
      .put(`${backend_url}/user/change-password`, changePasswordDTO)
      .then((resp) => {
        if (resp.data) {
          setLoginAgain(true);
        }
      })
      .catch((err) => {
        const errorMessage = err.response.data.message;
        if (errorMessage == "Senha inválida") {
          setInputCurrentPasswordWrong(true);
          setErrorMessageCurrentPassword("Senha inválida.");
        } else {
          alert(errorMessage);
        }
      })
      .finally(() => setLoading(false));
  };

  const validInputs = () => {
    var allValids = true;
    var firstElement = null;

    if (currentPassword.length == 0) {
      allValids = false;
      setInputCurrentPasswordWrong(true);
      setErrorMessageCurrentPassword("Por favor, digite sua senha.");
      firstElement = inputCurrentPasswordRef.current;
    }

    if (passwordValid == false) {
      allValids = false;
      setInputNewPasswordWrong(true);
      if (!errorMessageNewPassword) setErrorMessageNewPassword("Por favor, digite uma senha.");
      if (firstElement == null) firstElement = inputNewPasswordRef.current;
    }

    if (confirmNewPassword.length == 0 || confirmNewPassword != newPassword) {
      allValids = false;
      setInputConfirmNewPasswordWrong(true);
      if (!errorMessageConfirmNewPassword || !inputConfirmNewPasswordWrong)
        setErrorMessageConfirmNewPassword("Por favor, digite a confirmação da senha.");
      if (firstElement == null) firstElement = inputConfirmNewPasswordRef.current;
    }

    firstElement?.focus();

    return allValids;
  };

  const onLoginAgain = () => {
    Cookies.remove("token");
    navigate("/minha-conta");
  };

  return (
    <div className="container-modal-change-password">
      {!loginAgain ? (
        <div className="wrapper-login-again">
          <div className="close-login-again">
            <svg
              onClick={onLoginAgain}
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </div>
          <div className="icon-login-again">
            <svg viewBox="0 0 210 210" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <defs>
                <path id="alert-senha_svg__a" d="M0 64.354V128h127.292V.708H0v63.646z"></path>
                <path id="alert-senha_svg__c" d="M0 184.583h127.292V2H0z"></path>
              </defs>
              <g transform="translate(41 13)" fill="none" fill-rule="evenodd">
                <path
                  d="m47.69 27.196-.032-.699c-.004-.025-.029-2.726 2.012-4.962 2.536-2.78 7.554-4.25 14.544-4.25 13.921 0 15.314 7.59 15.407 9.982v42.056a63.217 63.217 0 0 1 15.285 6.206V27.23c.003-.985-.163-9.834-7.29-16.96C82.126 4.781 74.314 2 64.425 2h-.246c-11.532 0-20.212 3.106-25.802 9.232-5.956 6.527-6.072 14.076-5.974 16.18V75.52a63.228 63.228 0 0 1 15.285-6.2V27.195z"
                  fill="#CECECE"
                ></path>
                <path
                  d="m48.688 27.15.002 42.942-.75.194a62.22 62.22 0 0 0-15.044 6.104l-1.492.844V27.46c-.246-5.354 1.34-11.536 6.236-16.9C43.44 4.202 52.389 1 64.167 1h.26c10.14 0 18.206 2.875 23.896 8.563 3.27 3.27 5.388 7.113 6.572 11.213.43 1.488.71 2.925.869 4.275.105.903.144 1.643.142 2.18v50.014l-1.493-.845a62.21 62.21 0 0 0-15.044-6.109l-.748-.194V27.306c-.069-1.77-.711-3.636-2.24-5.236-2.277-2.38-6.194-3.785-12.166-3.785-6.732 0-11.497 1.394-13.806 3.925a6.75 6.75 0 0 0-1.544 2.887c-.158.61-.22 1.234-.209 1.355l.032.699zM46.69 69.319l.749-.968c-.25.065-.5.131-.75.2v.768zm-.025-42.701c-.15-1.253.521-3.843 2.267-5.756 2.767-3.033 8.043-4.576 15.282-4.576 6.483 0 10.925 1.592 13.612 4.403 1.906 1.994 2.707 4.32 2.795 6.58v41.287a64.108 64.108 0 0 1 13.285 5.284V27.226a16.718 16.718 0 0 0-.129-1.943 24.581 24.581 0 0 0-.803-3.952c-1.096-3.792-3.05-7.338-6.066-10.353-5.285-5.285-12.84-7.979-22.481-7.979L64.178 3c-11.27 0-19.681 3.01-25.062 8.906a21.657 21.657 0 0 0-5.027 9.324c-.594 2.312-.766 4.425-.687 6.182V73.83a64.112 64.112 0 0 1 13.286-5.28V27.216l-.024-.6z"
                  fill="#262626"
                  fill-rule="nonzero"
                ></path>
                <path
                  d="M64.235 165.493c-24.607 0-44.556-19.948-44.556-44.556 0-24.607 19.95-44.555 44.556-44.555 24.607 0 44.556 19.948 44.556 44.555 0 24.608-19.949 44.556-44.556 44.556m61.225-44.556c0-34.084-27.73-61.814-61.814-61.814-34.085 0-61.814 27.73-61.814 61.814 0 34.085 27.73 61.814 61.814 61.814s61.814-27.73 61.814-61.814"
                  fill="#999"
                ></path>
                <path
                  d="M31.94 88.582c17.444-17.355 45.655-17.284 63.01.16l11.817-11.758c-24.04-24.161-63.255-24.26-87.417-.22-24.162 24.04-24.261 63.255-.221 87.418l12.652-12.588c-17.356-17.445-17.285-45.655.159-63.011"
                  fill="#AFAFAF"
                ></path>
                <g transform="translate(0 56.583)">
                  <mask id="alert-senha_svg__b" fill="#fff">
                    <use xlinkHref="#alert-senha_svg__a"></use>
                  </mask>
                  <path
                    d="M1.832 64.354c0-34.084 27.73-61.814 61.814-61.814s61.814 27.73 61.814 61.814-27.73 61.814-61.814 61.814S1.832 98.438 1.832 64.354M94.906 8.947A63.203 63.203 0 0 0 79.62 2.74 63.522 63.522 0 0 0 63.646.708c-5.509 0-10.855.705-15.957 2.027a63.26 63.26 0 0 0-15.285 6.201C13.08 19.874 0 40.61 0 64.354 0 99.448 28.552 128 63.646 128s63.646-28.552 63.646-63.646c0-23.737-13.072-44.467-32.386-55.407"
                    fill="#262626"
                    mask="url(#alert-senha_svg__b)"
                  ></path>
                </g>
                <path
                  d="M63.933 158.651c-20.83 0-37.714-16.885-37.714-37.714 0-20.829 16.885-37.714 37.714-37.714 20.829 0 37.714 16.885 37.714 37.714 0 20.83-16.885 37.714-37.714 37.714m.303-82.27c-24.608 0-44.556 19.95-44.556 44.556 0 24.607 19.948 44.556 44.556 44.556 24.607 0 44.555-19.949 44.555-44.556 0-24.607-19.948-44.556-44.555-44.556"
                  fill="#262626"
                ></path>
                <path
                  d="M37.033 93.279c14.71-14.637 38.465-14.627 53.169-.025l4.635-4.612c-17.37-17.28-45.455-17.301-62.844 0-17.39 17.302-17.51 45.388-.317 62.844l5.064-5.04c-14.527-14.777-14.417-38.531.293-53.167"
                  fill="#3A3A3A"
                ></path>
                <mask id="alert-senha_svg__d" fill="#fff">
                  <use xlinkHref="#alert-senha_svg__c"></use>
                </mask>
                <path
                  d="M94.369 121.91h5.901v-1.609h-5.901v1.609zm-8.346-21.757-1.137-1.138 4.172-4.173 1.138 1.138-4.173 4.173zm3.035 47.216-4.172-4.173 1.137-1.137 4.173 4.173-1.138 1.137zm-25.057-13.9c-6.92 0-12.531-5.611-12.531-12.532 0-5.107 3.06-9.493 7.442-11.445l5.021-14.086 5.155 14.085c4.384 1.951 7.445 6.338 7.445 11.446 0 6.921-5.611 12.532-12.532 12.532zm-.873 23.974h1.609v-5.901h-1.609v5.901zm-21.286-57.29-4.173-4.173 1.138-1.138 4.173 4.173-1.138 1.138zm-3.035 47.216-1.138-1.137 4.173-4.173 1.138 1.137-4.173 4.173zm24.321-56.7h1.609v-5.901h-1.609v5.901zM27.595 121.91h5.901v-1.609h-5.901v1.609zm36.338-38.687c-20.829 0-37.714 16.885-37.714 37.714 0 20.829 16.885 37.714 37.714 37.714 20.828 0 37.713-16.885 37.713-37.714 0-20.829-16.885-37.714-37.713-37.714z"
                  fill="#CECECE"
                  mask="url(#alert-senha_svg__d)"
                ></path>
                <path
                  fill="#262626"
                  mask="url(#alert-senha_svg__d)"
                  d="M63.128 90.669h1.609v-5.901h-1.609zm0 66.774h1.609v-5.901h-1.609zm31.241-35.533h5.901v-1.609h-5.901zm-66.774 0h5.901v-1.609h-5.901zm57.291 21.286 4.173 4.173 1.137-1.137-4.172-4.173zM37.67 95.98l4.172 4.173 1.137-1.138-4.172-4.173zm47.216 3.035 1.138 1.138 4.172-4.173-1.137-1.138zM37.67 146.232l1.137 1.137 4.172-4.173-1.137-1.137zm31.418-36.741-5.156-14.085-5.02 14.086c-4.382 1.952-7.442 6.338-7.442 11.445 0 6.921 5.611 12.532 12.531 12.532 6.921 0 12.532-5.611 12.532-12.532 0-5.108-3.061-9.495-7.445-11.446"
                ></path>
                <path
                  d="M68.4 119.352a6.928 6.928 0 1 0-13.856 0 6.928 6.928 0 0 0 13.856 0"
                  fill="#3A3A3A"
                  mask="url(#alert-senha_svg__d)"
                ></path>
              </g>
            </svg>
          </div>
          <h3>Senha alterada com sucesso!</h3>
          <span>Para continuar navegando, por favor faça login novamente utilizando a nova senha.</span>
          <div className="button-login-again">
            <ButtonStyle text="Continuar" isButton handleClickEvent={onLoginAgain} />
          </div>
        </div>
      ) : (
        <div className="wrapper-modal-change-password">
          <div className="modal-close-change-password">
            <svg
              onClick={() => setOpenModalChangePassword(false)}
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </div>
          <div className={`form-change-password ${loading ? "show-loading" : ""}`}>
            <h3>Alterar Senha</h3>
            <div className="loading-change-password">
              <div className="spinner-login"></div>
            </div>
            <div className="modal-change-password">
              <SimpleInput
                nameField="Senha Atual"
                value={currentPassword}
                isPassword
                handleChange={onChangeCurrentPassword}
                handleBlur={onBlurCurrentPassword}
                inputWrong={inputCurrentPasswordWrong}
                errorMessage={errorMessageCurrentPassword}
                ref={inputCurrentPasswordRef}
              />
              <SimpleInput
                nameField="Digite sua nova senha"
                value={newPassword}
                isPassword
                handleChange={onChangeNewPassword}
                handleBlur={onBlurNewPassword}
                inputWrong={inputNewPasswordWrong}
                errorMessage={errorMessageNewPassword}
                ref={inputNewPasswordRef}
              />
              <SimpleInput
                nameField="Confirme sua nova senha"
                value={confirmNewPassword}
                isPassword
                handleChange={onChangeConfirmNewPassword}
                handleBlur={onBlurConfirmNewPassword}
                inputWrong={inputConfirmNewPasswordWrong}
                errorMessage={errorMessageConfirmNewPassword}
                ref={inputConfirmNewPasswordRef}
              />
              <div className="valid-change-password">
                <ValidPassword requiredInPassword={requiredInPassword} />
              </div>
              <RecaptchaComponent setReCAPTCHA={setReCAPTCHA} alignCenter={false} no_margin />
              <div className="button-change-password">
                <ButtonStyle text="Alterar Senha" isButton disabled={!reCAPTCHA} handleClickEvent={onSubmit} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ModalChangePassword;
