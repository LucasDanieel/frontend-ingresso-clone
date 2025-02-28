import NavAboutIngresso from "../nav-about-ingresso";
import PaymentMethod from "../payment-method";
import "./styles.scss";

const Instruction = () => {
  return (
    <div className="wrapper-instruction">
      <div className="instruction">
        <NavAboutIngresso />
        <div className="sell-with-us">
          <h3>Venda ingressos online</h3>
          <span>Buscando parcerias ou soluções para o seu evento ?</span>
          <button>Venda conosco</button>
        </div>
      </div>
      <div className="instruction">
        <PaymentMethod />
      </div>
      <div className="instruction">
        <div className="wrapper-awards">
          <div>
            <h3>Selo do Consumidor</h3>
            <div className="awards">
              <img src="\assets\img\consumidor-gov-br.png" alt="" />
            </div>
          </div>
          <div>
            <h3>Campeã em Atendimento</h3>
            <div className="awards">
              <img src="\assets\img\ingresso-awards-2019.png" alt="" />
            </div>
          </div>
          <div>
            <h3>O melhor app de ingresso</h3>
            <div className="awards">
              <img src="\assets\img\ingresso-best-app.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="ingresso-address">
        <span>
          Ingresso.com Ltda / CNPJ: 008606400001-71 Endereço: Rua da Quitanda, 86 - 3º andar - Centro - RJ - 20091-005
        </span>
        <span>
          <a href="https://atendimento.ingresso.com/portal/pt-br/kb/atendimento-ingresso-com" target="_blank">
            Atendimento ao cliente{" "}
          </a>
          © 2024 - Copyright Ingresso.com - todos os direitos reservados
        </span>
      </div>
    </div>
  );
};

export default Instruction;
