import { requiredInPassword } from "../../../@types/user";
import "./styles.scss";

type validPasswordProps = {
  requiredInPassword: requiredInPassword;
};

const ValidPassword = ({ requiredInPassword }: validPasswordProps) => {
  return (
    <div className="wrapper-valid-password">
      <p>Sua senha precisa atender aos seguintes critérios:</p>
      <div
        className={`required-in-password ${requiredInPassword.letraMinuscula ? "valid" : ""}`}
        data-testid="minimo-letra-minuscula"
      >
        <svg width="10" height="9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 4.5 2.818 8 9 1"
            stroke="#0C0"
            strokeWidth="1.58"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <span>Mínimo uma letra minúscula *</span>
      </div>
      <div
        className={`required-in-password ${requiredInPassword.letraMaiuscula ? "valid" : ""}`}
        data-testid="minimo-letra-maiuscula"
      >
        <svg width="10" height="9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 4.5 2.818 8 9 1"
            stroke="#0C0"
            strokeWidth="1.58"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <span>Mínimo uma letra maiúscula *</span>
      </div>
      <div
        className={`required-in-password${requiredInPassword.hasNumber ? " valid" : ""}`}
        data-testid="minimo-um-numero"
      >
        <svg width="10" height="9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 4.5 2.818 8 9 1"
            stroke="#0C0"
            strokeWidth="1.58"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <span>Mínimo um número *</span>
      </div>
      <div
        className={`required-in-password${requiredInPassword.minimumLength ? " valid" : ""}`}
        data-testid="minimo-8-caracteres"
      >
        <svg width="10" height="9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 4.5 2.818 8 9 1"
            stroke="#0C0"
            strokeWidth="1.58"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <span>Mínimo de 8 caracteres *</span>
      </div>
    </div>
  );
};

export default ValidPassword;
