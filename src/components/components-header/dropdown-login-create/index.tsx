import { useNavigate } from "react-router-dom";
import ButtonGradient from "../../buttons-styles/button-gradient";
import WrapperDropdown from "../wrapper-dropdown";
import "./styles.scss";

type DropdownLoginCreateProps = {
  left: number;
};
const DropdownLoginCreate = ({ left }: DropdownLoginCreateProps) => {
  const navigate = useNavigate();

  return (
    <WrapperDropdown left={left}>
      <div className="container-login-or-create" data-testid="login-create-component">
        <div className="create-account">
          <h3>Ainda não é cliente Ingresso.com?</h3>
          <p>Compre ingressos e combos de pipoca para ir ao cinema com segurança e mais comodidade!</p>
          <ButtonGradient text="Criar uma nova conta" handleClickEvent={() => navigate("/minha-conta/cadastro")} />
        </div>
        <div className="login-account">
          <h3>Cliente Ingresso.com</h3>
          <a href="/minha-conta">Entrar na minha Conta</a>
        </div>
      </div>
    </WrapperDropdown>
  );
};

export default DropdownLoginCreate;
