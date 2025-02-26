import { Dispatch, SetStateAction } from "react";
import "./styles.scss";

import { userCreated } from "../../../@types/user";
import ButtonGradient from "../../buttons-styles/button-gradient";
import { useNavigate } from "react-router-dom";

type confirmEmailProps = {
  userCreated: userCreated;
  setUserCreated: Dispatch<SetStateAction<userCreated>>;
};

const ConfirmEmail = ({ userCreated, setUserCreated }: confirmEmailProps) => {
  const navigate = useNavigate();
  const closeConfirmEmail = () => {
    setUserCreated({ name: "", isCompleted: false });
  };

  return (
    <div className="container-confirm-email">
      <div className="wrapper-confirm-email">
        <div className="close-confirm-email">
          <svg
            onClick={closeConfirmEmail}
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            className="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </div>
        <div className="header-confirm-email">
          <img src="\assets\img\icon-ingresso-144x144.png" alt="Icone do ingresso.com" />
          <span>Falta Pouco!</span>
        </div>
        <div className="text-confirm-email">
          <p>Olá, {userCreated.name}!</p>
          <span>Confirme seu cadastro clicando no link que acabamos de enviar para o seu e-mail.</span>
        </div>
        <div className="button-confirm-email">
          <ButtonGradient text="Continuar" fontBold handleClickEvent={() => navigate("/minha-conta")} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
