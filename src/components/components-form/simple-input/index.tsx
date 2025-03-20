import { ChangeEvent, forwardRef, KeyboardEvent, useState } from "react";
import "./styles.scss";
import { IconError, IconEye, IconEyeSlash } from "../../../icons";

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
                <IconEyeSlash setShowPassword={setShowPassword} />
              ) : (
                <IconEye setShowPassword={setShowPassword} />
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
            <IconError />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    );
  }
);

export default SimpleInput;
