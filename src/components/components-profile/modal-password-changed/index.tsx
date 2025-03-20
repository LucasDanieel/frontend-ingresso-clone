import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction, useContext } from "react";
import Cookies from "js-cookie";

import "./styles.scss";
import ButtonGradient from "../../buttons-styles/button-gradient";
import { UserContext } from "../../../providers/user-provider";
import { UserContextType } from "../../../@types/user";
import { IconCloseX, IconLock } from "../../../icons";

type ModalPasswordChangedProps = {
  setOpenModalChangePassword: Dispatch<SetStateAction<boolean>>;
};

const ModalPasswordChanged = ({ setOpenModalChangePassword }: ModalPasswordChangedProps) => {
  const { setUser } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();

  const onLogout = () => {
    setUser(null);
    Cookies.remove("token");
    navigate("/minha-conta");
  };

  return (
    <div className="wrapper-password-changed" data-testid="modal-password-changed">
      <div className="close-password-changed">
        <IconCloseX setState={setOpenModalChangePassword} />
      </div>
      <div className="icon-password-changed">
        <IconLock />
      </div>
      <h3>Senha alterada com sucesso!</h3>
      <span>Para continuar navegando, por favor faça login novamente utilizando a nova senha.</span>
      <div className="button-password-changed">
        <ButtonGradient text="Continuar" fontBold handleClickEvent={onLogout} />
      </div>
    </div>
  );
};

export default ModalPasswordChanged;
