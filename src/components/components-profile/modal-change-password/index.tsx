import { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import "./styles.scss";

import { requiredInPassword } from "../../../pages/create";
import ValidPassword from "../../components-create-login/valid-password";
import SimpleInput from "../../form-inputs/simple-input";
import RecaptchaComponent from "../../components-create-login/recaptcha-component";
import ButtonStyle from "../../button-style";
import { validInputPassword } from "../../../utils/input-methods";
import ModalPasswordChanged from "../modal-pasword-changed";

type changePasswordProps = { email: string; setOpenModalChangePassword: (state: boolean) => void };

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

  const [isLoading, setLoading] = useState<boolean>(false);
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
      .put(`/user/change-password`, changePasswordDTO)
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

  return (
    <div className="container-modal-change-password">
      {loginAgain ? (
        <ModalPasswordChanged />
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
          <div className={`form-change-password ${isLoading ? "show-loading" : ""}`}>
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
