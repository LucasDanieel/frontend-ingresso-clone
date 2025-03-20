import { Dispatch, SetStateAction } from "react";
import "./styles.scss";

import { userCreated } from "../../../@types/user";
import ButtonGradient from "../../buttons-styles/button-gradient";
import { useNavigate } from "react-router-dom";
import { IconCloseX } from "../../../icons";

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
          <IconCloseX setState={closeConfirmEmail} />
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
