import { useContext, useEffect, useState } from "react";
import "./styles.scss";

import HeaderFooter from "../../components/header-footer";
import FormLogin from "../../components/components-login/form-login";
import ConfirmCode from "../../components/components-login/confirm-code";
import { UserContext } from "../../providers/user-provider";
import { UserContextType } from "../../@types/user";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ButtonStyle from "../../components/button-style";

export type maskedUser = {
  email: string;
  maskedEmail: string;
};

const Login = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [wrongCode, setWrongCode] = useState<boolean>(false);
  const [confirmCode, setConfirmCode] = useState<boolean>(false);
  const [maskedUser, setMaskedUser] = useState<maskedUser>({ email: "", maskedEmail: "" });
  const [confirmedAccount, setConfirmedAccount] = useState<boolean>(false);

  const { token_confirmacao_email } = useParams();

  const { user } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();

  useEffect(() => {
    if (user != null) navigate("/minha-conta/meus-pedidos");
  }, [user]);

  useEffect(() => {
    if (token_confirmacao_email) {
      axios
        .post(`/user/confirm-email?token=${token_confirmacao_email}`)
        .then((resp) => {
          if (resp.data.isSuccess) {
            setConfirmedAccount(true);
          }
        })
        .catch((err) => {
          const errorMessage = err.response.data.message;
          // console.warn(errorMessage);
          if (errorMessage == "Usuario já confirmado") alert("A conta já está confirmada");
          else if (errorMessage == "Token invalido") alert(errorMessage);
          else if (errorMessage == "Usuario não encontrado") alert("Usuario não encontrado");
          else alert("Não foi possivel validar essa conta");
        });
    }
  }, [token_confirmacao_email]);

  const onBackToLogin = () => {
    setMaskedUser({ email: "", maskedEmail: "" });
    setWrongCode(false);
    setLoading(false);
    setConfirmCode(false);
  };

  return (
    <>
      {confirmedAccount && (
        <div className="wrapper-confirmed-account">
          <div className="confirmed-account">
            <div className="confirmed-account-close-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
                onClick={() => setConfirmedAccount(false)}
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </div>
            <div className="confirmed-account-icon">
              <img src="\assets\img\like.png" alt="" />
            </div>
            <div className="confirmed-account-button">
              <h3>Cadastro confirmado!</h3>
              <ButtonStyle text="continuar" isButton handleClickEvent={() => setConfirmedAccount(false)} />
            </div>
          </div>
        </div>
      )}
      <HeaderFooter>
        <main className="container-main-login">
          <div className="login-text">
            <span>Encontre filmes e eventos com facilidade e a qualquer hora!</span>
          </div>
          <div className="wrapper-main-login">
            <div className={isLoading ? "controll-loading-login" : ""}>
              <div className="loading-login">
                <div className="spinner-login"></div>
              </div>
              <div className={`controll-form-login ${confirmCode ? "hidden-form-login" : ""}`}>
                <FormLogin
                  wrongCode={wrongCode}
                  setLoading={setLoading}
                  setMaskedUser={setMaskedUser}
                  setConfirmCode={setConfirmCode}
                />
              </div>
              <div className={`controll-confirm-code-login ${confirmCode ? "show-confirm-code" : ""}`}>
                <ConfirmCode
                  maskedUser={maskedUser}
                  setLoading={setLoading}
                  setWrongCode={setWrongCode}
                  setConfirmCode={setConfirmCode}
                  handleBackToLogin={onBackToLogin}
                  navigate={navigate}
                />
              </div>
            </div>
          </div>
        </main>
      </HeaderFooter>
    </>
  );
};

export default Login;
