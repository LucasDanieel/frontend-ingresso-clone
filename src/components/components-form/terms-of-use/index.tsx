import "./styles.scss";

const TermsOfUse = () => {
  return (
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
        <a href="https://atendimento.ingresso.com/portal/pt-br/kb/articles/pol%C3%ADtica-de-cookies" target="_blank">
          Política de Cookies
        </a>
        {"."}
      </p>
      <p>
        {"Deseja excluir sua conta? Siga os "}
        <a
          href="https://atendimento.ingresso.com/portal/pt-br/kb/articles/quero-excluir-minha-conta-como-fa%C3%A7o"
          target="_blank"
        >
          passos a seguir
        </a>
        {"."}
      </p>
    </div>
  );
};

export default TermsOfUse;
