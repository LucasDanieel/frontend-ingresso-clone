import { ChangeEvent, forwardRef, KeyboardEvent, useState } from "react";
import "./styles.scss";

type SimpleInputProps = {
  nameField: string;
  value: string;
  errorMessage?: string;
  inputWrong?: boolean;
  isCep?: boolean;
  isPassword?: boolean;
  formLogin?: boolean;
  showError?: boolean;
  disabled?: boolean;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFocos?: () => void;
  handleBlur?: () => void;
  handleKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleChangePassword?: () => void;
};

const SimpleInput = forwardRef<HTMLInputElement, SimpleInputProps>(
  (
    {
      nameField,
      value,
      errorMessage,
      inputWrong = false,
      isCep = false,
      isPassword = false,
      formLogin = false,
      showError = true,
      disabled = false,
      handleChange = () => {},
      handleFocos,
      handleBlur,
      handleKeyDown,
      handleChangePassword,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    return (
      <div className={`wrapper-form-input${inputWrong ? " wrong-input" : ""}`}>
        <div className={`wrapper-input${!showError ? " error-hidden" : ""}${disabled ? " disable" : ""}`}>
          <div className={`simple-input${value.length > 0 ? " hasValue" : ""}`}>
            <input
              id={nameField}
              value={value}
              placeholder={nameField}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocos}
              onKeyDown={handleKeyDown}
              type={isPassword ? (showPassword ? "text" : "password") : "text"}
              disabled={disabled}
              ref={ref}
            />
            <label htmlFor={nameField}>{nameField}</label>
          </div>
          {isPassword && (
            <div className="wrapper-icon-password">
              {!showPassword ? (
                <svg
                  data-testid="icon-hidden-password"
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  className="bi bi-eye-slash"
                  viewBox="0 0 16 16"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                  <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                </svg>
              ) : (
                <svg
                  data-testid="icon-visible-password"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-eye"
                  viewBox="0 0 16 16"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>
              )}
            </div>
          )}
          {nameField == "Senha" && (
            <div className="change-password" onClick={handleChangePassword}>
              <span>Alterar senha</span>
            </div>
          )}
          {isCep && (
            <div className="find-zip-code">
              <a href="https://buscacepinter.correios.com.br/app/endereco/index.php" target="_blank">
                Não sei meu CEP
              </a>
            </div>
          )}
        </div>
        {inputWrong && showError && (
          <div className={`wrapper-warning${formLogin ? " warning-form-login" : ""}`}>
            <svg
              width="28"
              height="28"
              data-testid="icon-input-wrong"
              viewBox="0 0 30 30"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M25 15.5a9.5 9.5 0 1 1-19 0 9.5 9.5 0 0 1 19 0zm-1.357 0a8.143 8.143 0 1 0-16.286 0 8.143 8.143 0 0 0 16.286 0zm-7.3 2.313h-1.439l-.294-7.24c-.017-.472.429-.86.988-.86h.04c.563 0 .93.384.912.86l-.207 7.24zm-.727 3.702c-.525 0-.97-.456-.97-.984 0-.537.44-.983.97-.983s.97.446.97.983c0 .528-.444.984-.97.984z"></path>
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    );
  }
);

export default SimpleInput;
