import { Dispatch, SetStateAction } from "react";
import { IconCloseX } from "../../../icons";
import ButtonGradient from "../../buttons-styles/button-gradient";
import "./styles.scss";

type ModalConfirmedAccountProp = {
  setConfirmedAccount: Dispatch<SetStateAction<boolean>>;
};

const ModalConfirmedAccount = ({ setConfirmedAccount }: ModalConfirmedAccountProp) => {
  return (
    <div className="wrapper-confirmed-account">
      <div className="confirmed-account">
        <div className="confirmed-account-close-button">
          <IconCloseX setState={setConfirmedAccount} />
        </div>
        <div className="confirmed-account-icon">
          <img src="\assets\img\like.png" alt="" />
        </div>
        <div className="confirmed-account-button">
          <h3>Cadastro confirmado!</h3>
          <ButtonGradient text="continuar" fontBold handleClickEvent={() => setConfirmedAccount(false)} />
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmedAccount;
