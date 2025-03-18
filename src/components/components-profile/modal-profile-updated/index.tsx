import { Link } from "react-router-dom";

import ButtonGradient from "../../buttons-styles/button-gradient";
import "./styles.scss";

type ModalProfileUpdatedProps = {
  setProfileUpdated: (value: boolean) => void;
};

const ModalProfileUpdated = ({ setProfileUpdated }: ModalProfileUpdatedProps) => {
  return (
    <div className="wrapper-profile-updated">
      <div className="profile-updated">
        <div className="close-profile-updated">
          <svg
            data-testid="icon-close-profile-updated"
            onClick={() => setProfileUpdated(false)}
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
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
        <Link to="/">Ir para a página inicial</Link>
      </div>
    </div>
  );
};

export default ModalProfileUpdated;
