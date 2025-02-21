import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ButtonStyle from "../../button-style";
import SimpleInput from "../../form-inputs/simple-input";
import { maskedUser } from "../../../pages/login";
import "./styles.scss";

import isEmail from "validator/lib/isEmail";
import axios from "axios";
import Cookies from "js-cookie";

type userLoginDTO = {
  cpf: string | null;
  email: string | null;
  password: string;
};

type formLoginProps = {
  wrongCode: boolean;
  setLoading: (value: boolean) => void;
  setMaskedUser: (value: maskedUser) => void;
  setConfirmCode: (value: boolean) => void;
};

const FormLogin = ({ wrongCode, setLoading, setMaskedUser, setConfirmCode }: formLoginProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [stayConnected, setStayConnected] = useState<boolean>(true);

  const [wrongLogin, setWrongLogin] = useState<boolean>(false);
  const [inputUsernameWrong, setInputUsernameWrong] = useState<boolean>(false);
  const [inputPasswordWrong, setInputPasswordWrong] = useState<boolean>(false);

  const inputUsernameRef = useRef<HTMLInputElement | null>(null);
  const inputPasswordRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const accessTokenRegex = /access_token=([^&]+)/;
    const isMatch = window.location.href.match(accessTokenRegex);

    if (isMatch) {
      const accessToken = isMatch[1];
      Cookies.set("access_token", accessToken);
      getEmailInformation(accessToken);
    }
  }, []);

  const getEmailInformation = async (accessToken: string) => {
    const googleData = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
    );

    if (googleData.data.verified_email) {
      axios
        .get(`/user/login-via-google?email=${googleData.data.email}`)
        .then((resp) => {
          Cookies.set("token", resp.data); // token
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  };

  const onLoginGoogle = () => {
    const callbackUrl = window.location.href;
    const clientId = import.meta.env.VITE_CLIENT_ID;

    window.location.href = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=token&client_id=${clientId}&scope=openid%20email%20profile`;
  };

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
          <ButtonStyle text="Entrar" isButton handleClickEvent={onSubmit} />
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
      <div className="wrapper-login-with-google">
        <button type="button" className="login-with-google" onClick={onLoginGoogle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 23 23">
            <g fill="none" fillRule="evenodd">
              <rect width="26" height="26" fill="#21262D" rx="1"></rect>
              <path
                fill="#D7282A"
                d="M3.99 7.956c.374-.806.903-1.51 1.524-2.146 1.404-1.44 3.104-2.363 5.117-2.677 2.817-.44 5.338.21 7.516 2.045.138.116.172.184.022.327-.769.737-1.526 1.486-2.287 2.23-.078.077-.13.17-.27.046-1.917-1.72-5.048-1.7-7.086.154a5.72 5.72 0 0 0-1.524 2.275c-.047-.03-.097-.058-.142-.091L3.99 7.956"
              ></path>
              <path
                fill="#45AC43"
                d="M6.98 13.723c.275.683.616 1.329 1.124 1.878 1.291 1.395 2.892 1.997 4.81 1.802.89-.09 1.702-.386 2.461-.84.073.064.142.132.219.191.887.678 1.776 1.355 2.665 2.032a7.68 7.68 0 0 1-3.438 1.839c-3.068.759-5.897.28-8.408-1.66A8.377 8.377 0 0 1 3.982 16l2.998-2.277"
              ></path>
              <path
                fill="#4485F4"
                d="M18.259 18.786c-.889-.677-1.778-1.354-2.665-2.032-.077-.059-.146-.127-.219-.19.602-.45 1.104-.98 1.433-1.656a5.72 5.72 0 0 0 .312-.836c.06-.196.041-.273-.207-.27-1.48.012-2.958.005-4.437.005-.313 0-.313 0-.313-.317 0-.98.004-1.962-.005-2.942-.001-.19.032-.262.25-.262 2.728.008 5.456.006 8.183.003.148 0 .24.01.266.186.34 2.334.067 4.565-1.181 6.625-.383.63-.842 1.207-1.417 1.686"
              ></path>
              <path
                fill="#F4C300"
                d="M6.98 13.723 3.982 16c-.488-.888-.77-1.841-.9-2.835a8.707 8.707 0 0 1 .768-4.957c.04-.086.093-.168.14-.252l2.87 2.163c.045.033.095.06.142.091-.4 1.169-.38 2.34-.022 3.513"
              ></path>
            </g>
          </svg>
          <span>Continuar com o Google</span>
        </button>
      </div>
      <div className="create-account">
        <span>
          Não possui cadastro? <Link to="/minha-conta/cadastro">Criar uma nova conta</Link>
        </span>
      </div>
    </form>
  );
};

export default FormLogin;
