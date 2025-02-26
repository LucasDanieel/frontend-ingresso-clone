import ButtonGradient from "../../buttons-styles/button-gradient";
import "./styles.scss";

type ModalConfirmedAccountProp = {
  setConfirmedAccount: (value: boolean) => void;
};

const ModalConfirmedAccount = ({ setConfirmedAccount }: ModalConfirmedAccountProp) => {
  return (
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
          <ButtonGradient text="continuar" fontBold handleClickEvent={() => setConfirmedAccount(false)} />
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmedAccount;
