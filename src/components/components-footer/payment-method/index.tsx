import {
  IconAmericanExpress,
  IconApplePay,
  IconAura,
  IconBancoDoBrasil,
  IconBradesco,
  IconC6,
  IconCaixaEconomica,
  IconElo,
  IconGooglePay,
  IconHipercard,
  IconInter,
  IconItau,
  IconMastercard,
  IconNext,
  IconNubank,
  IconPagbank,
  IconSantander,
  IconVisa,
} from "../../../icons";
import "./styles.scss";

const PaymentMethod = () => {
  return (
    <div className="container-payment-method">
      <span>Formas de Pagamento</span>
      <div className="wrapper-payment-method">
        <div>
          <h3>Crédito</h3>
          <div className="options-payment-method">
            <div className="payment-method">
              <IconVisa />
            </div>
            <div className="payment-method">
              <IconMastercard />
            </div>
            <div className="payment-method">
              <IconElo />
            </div>
            <div className="payment-method">
              <IconAura />
            </div>
            <div className="payment-method">
              <IconAmericanExpress />
            </div>
            <div className="payment-method">
              <IconHipercard />
            </div>
            <div className="payment-method">
              <IconPagbank />
            </div>
          </div>
        </div>
        <div>
          <h3>Débito</h3>
          <div className="options-payment-method">
            <div className="payment-method">
              <IconC6 />
            </div>
            <div className="payment-method">
              <IconNubank />
            </div>
            <div className="payment-method">
              <IconItau />
            </div>
            <div className="payment-method">
              <IconBradesco />
            </div>
            <div className="payment-method">
              <IconNext />
            </div>
            <div className="payment-method">
              <IconSantander />
            </div>
            <div className="payment-method">
              <IconBancoDoBrasil />
            </div>
            <div className="payment-method">
              <IconInter />
            </div>
            <div className="payment-method">
              <IconCaixaEconomica />
            </div>
            <div className="payment-method">
              <IconPagbank />
            </div>
          </div>
        </div>
        <div>
          <h3>Outros pagamentos</h3>
          <div className="options-payment-method">
            <div className="payment-method">
              <IconApplePay />
            </div>
            <div className="payment-method">
              <IconGooglePay />
            </div>
            <div className="payment-method no-margin-right">
              <img src="\assets\img\pix.png" alt="" />
            </div>
          </div>
        </div>
        <div>
          <h3>Troque seus pontos</h3>
          <div className="options-payment-method">
            <div className="payment-method img">
              <img src="\assets\img\easylive.png" alt="" />
            </div>
            <div className="payment-method img">
              <img src="\assets\img\livelo.png" alt="" />
            </div>
            <div className="payment-method img">
              <img src="\assets\img\tudo-azul.png" alt="" />
            </div>
            <div className="payment-method img no-margin-right">
              <img src="\assets\img\dotz.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
