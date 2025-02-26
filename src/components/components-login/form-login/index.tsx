import { KeyboardEvent, MouseEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import axios from "axios";
import "./styles.scss";

import SimpleInput from "../../form-inputs/simple-input";
import { maskedUser } from "../../../pages/login";
import LoginWithGoogle from "../login-with-google";
import ButtonGradient from "../../buttons-styles/button-gradient";

type userLoginDTO = {
  cpf: string | null;
  email: string | null;
  password: string;
};

type FormLoginProps = {
  wrongCode: boolean;
  setLoading: (value: boolean) => void;
  setMaskedUser: (value: maskedUser) => void;
  setConfirmCode: (value: boolean) => void;
};

const FormLogin = ({ wrongCode, setLoading, setMaskedUser, setConfirmCode }: FormLoginProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [stayConnected, setStayConnected] = useState<boolean>(true);

  const [wrongLogin, setWrongLogin] = useState<boolean>(false);
  const [inputUsernameWrong, setInputUsernameWrong] = useState<boolean>(false);
  const [inputPasswordWrong, setInputPasswordWrong] = useState<boolean>(false);

  const inputUsernameRef = useRef<HTMLInputElement | null>(null);
  const inputPasswordRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (e?: MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();

    if (!username || !password) {
      let firstInputWrong;

      if (!username) {
        firstInputWrong = inputUsernameRef.current;
        setInputUsernameWrong(true);
      }
      if (!password) {
        if (!firstInputWrong) firstInputWrong = inputPasswordRef.current;
        setInputPasswordWrong(true);
      }

      firstInputWrong?.focus();
      return;
    }

    var email = null;
    var cpf = null;

    if (isEmail(username)) {
      email = username;
    } else {
      cpf = username;
    }

    const userLoginDTO: userLoginDTO = { cpf, email, password };

    setLoading(true);
    axios
      .post(`/user/login`, userLoginDTO)
      .then((resp) => {
        setMaskedUser({ email: resp.data, maskedEmail: maskEmail(resp.data) });
        setWrongLogin(false);
        setConfirmCode(true);
      })
      .catch(() => {
        setWrongLogin(true);
      })
      .finally(() => setLoading(false));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") onSubmit();
  };

  const maskEmail = (email: string) => {
    const [user, domain] = email.split("@");
    const visibleUser = user.slice(0, 2);
    const maskedUser = visibleUser + "*".repeat(user.length - 2);

    const domainParts = domain.split(".");
    const visibleDomain = domainParts[0].slice(0, 2);
    const maskedDomain = visibleDomain + "*".repeat(domainParts[0].length - 2);

    return `${maskedUser}@${maskedDomain}.${domainParts.slice(1).join(".")}`;
  };

  return (
    <form className="wrapper-form-login">
      <div className="form-login">
        <div className="form-title">
          <h3>Olá!</h3>
          <span>Que bom que você voltou!</span>
        </div>
        <SimpleInput
          nameField="*CPF ou E-mail"
          value={username}
          formLogin={true}
          ref={inputUsernameRef}
          inputWrong={inputUsernameWrong}
          errorMessage="É obrigatório preencher o CPF ou o e-mail."
          handleChange={(e) => setUsername(e.target.value)}
          handleKeyDown={onKeyDown}
          showError={username.length <= 0 ? true : false}
        />
        <SimpleInput
          nameField="*Senha"
          value={password}
          formLogin={true}
          isPassword
          ref={inputPasswordRef}
          inputWrong={inputPasswordWrong}
          errorMessage="Por favor digite a sua senha."
          handleChange={(e) => setPassword(e.target.value)}
          handleKeyDown={onKeyDown}
          showError={password.length <= 0 ? true : false}
        />
        <div className="maintain-connected">
          <input type="checkbox" name="news" checked={stayConnected} onChange={() => setStayConnected((s) => !s)} />
          <span>Mantenha-me conectado</span>
        </div>
        {wrongLogin == true && (
          <div className="wrong-login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-clock"
              viewBox="0 0 16 16"
            >
              <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
            </svg>
            <span>Usuário ou senha inválidos. Se o problema persistir, entre em contato com o nosso atendimento.</span>
          </div>
        )}
        {wrongCode == true && (
          <div className="wrong-code">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              fill="currentColor"
              className="bi bi-exclamation-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
            </svg>
            <span>Usuário, senha ou código inválidos.</span>
          </div>
        )}
        <div className="form-submit">
          <ButtonGradient text="Entrar" fontBold handleClickEvent={onSubmit} />
        </div>
        <div className="issues-login">
          <a href="">Problemas para entrar?</a>
        </div>
      </div>
      <div className="login-another-way">
        <div className="mark-line"></div>
        <div className="login-another-way-text">
          <span>Ou entre com uma rede social</span>
        </div>
        <div className="mark-line"></div>
      </div>
      <LoginWithGoogle />
      <div className="create-account">
        <span>
          Não possui cadastro? <Link to="/minha-conta/cadastro">Criar uma nova conta</Link>
        </span>
      </div>
    </form>
  );
};

export default FormLogin;
