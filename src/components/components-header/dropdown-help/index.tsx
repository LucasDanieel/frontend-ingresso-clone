import ButtonGradient from "../../buttons-styles/button-gradient";
import ButtonTransparent from "../../buttons-styles/button-transparent";
import WrapperDropdown from "../wrapper-dropdown";
import "./styles.scss";

type DropdownHelpProps = {
  left: number;
};
const DropdownHelp = ({ left }: DropdownHelpProps) => {
  return (
    <WrapperDropdown left={left} container_help>
      <div className="container-help" data-testid="help-component">
        <h3>Quer cancelar um pedido?</h3>
        <p>Você mesmo pode cancelar seu pedido, sem contactar um atendente. É rápido e fácil!</p>
        <div className="help-buttons">
          <div className="button-help-yes">
            <ButtonGradient text="Sim, quero cancelar um pedido" />
          </div>
          <div className="button-help-no">
            <ButtonTransparent
              text="Não, quero outro tipo de atendimento"
              handleClickEvent={() =>
                window.open("https://atendimento.ingresso.com/portal/pt-br/kb/atendimento-ingresso-com", "_blank")
              }
            />
          </div>
        </div>
      </div>
    </WrapperDropdown>
  );
};

export default DropdownHelp;
