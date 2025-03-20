import { KeyboardEvent, MouseEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import axios from "axios";
import "./styles.scss";

import SimpleInput from "../../components-form/simple-input";
import { maskedUser } from "../../../pages/login";
import LoginWithGoogle from "../login-with-google";
import ButtonGradient from "../../buttons-styles/button-gradient";
import { IconError, IconErrorLogin } from "../../../icons";

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
            <IconErrorLogin />
            <span>Usuário ou senha inválidos. Se o problema persistir, entre em contato com o nosso atendimento.</span>
          </div>
        )}
        {wrongCode == true && (
          <div className="wrong-code">
            <IconError />
            <span>Usuário, senha ou código inválidos.</span>
          </div>
        )}
        <div className="form-submit">
          <ButtonGradient text="Entrar" fontBold handleClickEvent={onSubmit} />
        </div>
        <div className="issues-login">
          <a href="/">Problemas para entrar?</a>
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
