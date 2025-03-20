import { requiredInPassword } from "../../../@types/user";
import { IconRight } from "../../../icons";
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
        <IconRight />
        <span>Mínimo uma letra minúscula *</span>
      </div>
      <div
        className={`required-in-password ${requiredInPassword.letraMaiuscula ? "valid" : ""}`}
        data-testid="minimo-letra-maiuscula"
      >
        <IconRight />
        <span>Mínimo uma letra maiúscula *</span>
      </div>
      <div
        className={`required-in-password${requiredInPassword.hasNumber ? " valid" : ""}`}
        data-testid="minimo-um-numero"
      >
        <IconRight />
        <span>Mínimo um número *</span>
      </div>
      <div
        className={`required-in-password${requiredInPassword.minimumLength ? " valid" : ""}`}
        data-testid="minimo-8-caracteres"
      >
        <IconRight />
        <span>Mínimo de 8 caracteres *</span>
      </div>
    </div>
  );
};

export default ValidPassword;
