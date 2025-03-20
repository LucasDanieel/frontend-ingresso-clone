import { Dispatch, SetStateAction } from "react";
import { IconCloseX } from "../../../icons";
import ButtonGradient from "../../buttons-styles/button-gradient";
import "./styles.scss";

type ModalProfileUpdatedProps = {
  setProfileUpdated: Dispatch<SetStateAction<boolean>>;
};

const ModalProfileUpdated = ({ setProfileUpdated }: ModalProfileUpdatedProps) => {
  return (
    <div className="wrapper-profile-updated">
      <div className="profile-updated">
        <div className="close-profile-updated">
          <IconCloseX setState={setProfileUpdated} />
        </div>
        <div className="header-profile-updated">
          <img src="\assets\img\icon-ingresso-144x144.png" alt="Icone do ingresso.com" />
          <h3>Conta Atualizada!</h3>
        </div>
        <div className="text-profile-updated">
          <span>Os dados da sua conta foram alterados e a conta já está atualizada.</span>
        </div>
        <div className="button-profile-updated">
          <ButtonGradient text="OK" fontBold handleClickEvent={() => setProfileUpdated(false)} />
        </div>
        <a href="/">Ir para a página inicial</a>
      </div>
    </div>
  );
};

export default ModalProfileUpdated;
