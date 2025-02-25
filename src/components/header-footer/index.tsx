import { PropsWithChildren } from "react";
import "./styles.scss";

const HeaderFooter = ({ children }: PropsWithChildren) => {
  return (
    <div className="container">
      <div className="wrapper">
        <header className="header">
          <a href="/">
            <div className="logo-header">
              <img
                src="https://ingresso-a.akamaihd.net/catalog/img/ingresso-logo-v1-desktop-final.svg"
                alt="INGRESSO"
              />
            </div>
          </a>
        </header>
        {children}
        <footer className="wrapper-footer-login-and-create">
          <div className="footer">
            <p>
              {`Ingresso.com Ltda / CNPJ: 008606400001-71 / Endereço: Rua da
              Quitanda, 86 - 9º andar - Centro - Rio de Janeiro, RJ - 20091-902
              / `}
              <a href="https://atendimento.ingresso.com/portal/pt-br/kb/atendimento-ingresso-com" target="_blank">
                Atendimento ao cliente
              </a>
            </p>
            <p>© Copyright Ingresso.com - Todos os direitos reservados ®</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HeaderFooter;
