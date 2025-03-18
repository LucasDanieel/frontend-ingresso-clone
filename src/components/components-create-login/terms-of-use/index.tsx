import ReCAPTCHA from "react-google-recaptcha";
import "./styles.scss";

type termsOfUseProps = {
  recaptcha_key: string;
  handleChangeReCAPTCHA: (value: string | null) => void;
};

const TermsOfUse = ({ recaptcha_key, handleChangeReCAPTCHA }: termsOfUseProps) => {
  return (
    <>
      <div className="terms">
        <p>
          {"O uso de nosso site e aplicativo é regulado por nossos "}
          <a href="https://atendimento.ingresso.com/portal/pt-br/kb/articles/termos-de-uso" target="_blank">
            Termos de Uso.
          </a>
          {" Maiores informações sobre como usamos seus dados pessoais podem ser encontradas em nossa "}
          <a
            href="https://atendimento.ingresso.com/portal/pt-br/kb/articles/pol%C3%ADtica-de-privacidade"
            target="_blank"
          >
            Política de Privacidade
          </a>
          {" e "}
          <a
            href="https://atendimento.ingresso.com/portal/pt-br/kb/articles/pol%C3%ADtica-de-cookies"
            target="_blank"
          >
            Política de Cookies
          </a>
          .
        </p>
        <p>
          {"Deseja excluir sua conta? Siga os "}
          <a href="">passos a seguir</a>
          {"."}
        </p>
      </div>
      <div className="wrapper-recaptcha">
        <p>
          {"Este site é protegido pelo reCAPTCHA e pelo Google aplicando as seguintes "}
          <a href="https://policies.google.com/privacy" target="_blank">
            Políticas de Segurança
          </a>
          {" e "}
          <a href="https://policies.google.com/terms" target="_blank">
            Termos de Serviço.
          </a>
        </p>
        <ReCAPTCHA sitekey={recaptcha_key} onChange={handleChangeReCAPTCHA} />
      </div>
    </>
  );
};

export default TermsOfUse;
