import { NavLink } from "react-router-dom";
import "./styles.scss";
import { Iconfacebook, IconInstagram, IconLinkedIn, IconYoutube } from "../../../icons";

const NavAboutIngresso = () => {
  return (
    <div className="about-ingresso">
      <div className="about">
        <h3>Menu</h3>
        <ul>
          <li>
            <NavLink to="/filmes">Filmes</NavLink>
          </li>
          <li>
            <NavLink to="/cinemas">Cinemas</NavLink>
          </li>
        </ul>
      </div>
      <div className="about">
        <h3>Institucional</h3>
        <ul>
          <li>
            <a href="https://www.ingresso.com/institucional" target="_blank">
              Quem Somos
            </a>
          </li>
          <li>
            <a href="https://www.ingresso.com/institucional/assessoria-imprensa" target="_blank">
              Assessoria de Imprensa
            </a>
          </li>
          <li>
            <a href="https://b2b.ingresso.com/" target="_blank">
              Vale-Presente Corporativo
            </a>
          </li>
          <li>
            <a href="https://www.ingresso.com/institucional/ingresso-atende" target="_blank">
              Ingresso.com atende
            </a>
          </li>
          <li>
            <a href="https://www.movieid.com/" target="_blank">
              movieID.com
            </a>
          </li>
          <li>
            <a href="https://uol.gupy.io/" target="_blank">
              Faça parte do time
            </a>
          </li>
        </ul>
      </div>
      <div className="about">
        <h3>Políticas</h3>
        <ul>
          <li>
            <a
              href="https://atendimento.ingresso.com/portal/pt-br/kb/articles/pol%C3%ADtica-de-privacidade"
              target="_blank"
            >
              Privacidade e Segurança
            </a>
          </li>
          <li>
            <a
              href="https://atendimento.ingresso.com/portal/pt-br/kb/atendimento-ingresso-com/pol%C3%ADticas-do-site/pol%C3%ADticas-de-meia-entrada"
              target="_blank"
            >
              Meia-entrada
            </a>
          </li>
          <li>
            <a
              href="https://atendimento.ingresso.com/portal/pt-br/kb/articles/leia-nossa-pol%C3%ADtica-de-trocas-e-cancelamentos-de-ingressos"
              target="_blank"
            >
              Trocas e Cancelamentos
            </a>
          </li>
          <li>
            <a
              href="https://atendimento.ingresso.com/portal/pt-br/kb/atendimento-ingresso-com/pol%C3%ADticas-do-site/leis-estaduais-e-municipais"
              target="_blank"
            >
              Leis Estaduais e Municipais
            </a>
          </li>
          <li>
            <a href="https://atendimento.ingresso.com/portal/pt-br/kb/articles/termos-de-uso" target="_blank">
              Termos de Uso
            </a>
          </li>
        </ul>
      </div>
      <div className="about social-media">
        <h3>Redes Sociais</h3>
        <ul>
          <li>
            <a href="https://www.facebook.com/ingressocom/" target="_blank">
              <Iconfacebook />
              <span>Facebook</span>
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/user/Ingressocom" target="_blank">
              <IconYoutube />
              <span>Youtube</span>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/ingressocom/" target="_blank">
              <IconInstagram />
              <span>Instagram</span>
            </a>
          </li>
          <li>
            <a href="https://br.linkedin.com/company/ingressocom" target="_blank">
              <IconLinkedIn />
              <span>LinkedIn</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="about">
        <h3>Precisa de Ajuda?</h3>
        <ul>
          <li>
            <a href="https://atendimento.ingresso.com/portal/pt-br/kb/atendimento-ingresso-com" target="_blank">
              Atendimento
            </a>
          </li>
          <li>
            <a
              href="https://atendimento.ingresso.com/portal/pt-br/kb/articles/como-cancelar-uma-compra-na-ingresso-com#Para_clientes_cadastrados"
              target="_blank"
            >
              Cancelar Pedido
            </a>
          </li>
          <li>
            <a href="https://www.ingresso.com/politicas/alerta-emails-sites-falsos" target="_blank">
              Sites ou e-mails falsos
            </a>
          </li>
          <li>
            <a href="http://www.procon.rj.gov.br/" target="_blank">
              Procon-RJ
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavAboutIngresso;
