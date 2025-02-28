import { NavLink } from "react-router-dom";
import "./styles.scss";

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="48"
                viewBox="0 0 26 48"
                fill="none"
                className="injected-svg"
                data-src="/images/social-media/facebook.svg"
                role="img"
              >
                <title>Ícone do Facebook da ingresso.com</title>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.9918 25.4811C17.9918 25.4811 23.0281 25.4811 23.5293 25.4811C24.0306 25.4811 24.4133 25.0421 24.478 24.6197C24.5038 24.4052 24.7847 21.5586 25.4944 16.1637C25.5783 15.526 25.1012 14.988 24.5633 14.9882C24.0254 14.9883 17.9918 14.9881 17.9918 14.9881V12C17.9918 12 18.2163 11.6496 18.6666 11.6596C19.1169 11.6696 19.2366 11.6596 19.2366 11.6596C19.2366 11.6596 24.0332 11.6596 24.5074 11.6596C24.9815 11.6596 25.4556 11.1874 25.4556 10.7093C25.4556 10.4451 25.4556 7.21543 25.4556 1.02033C25.4556 0.366769 24.9583 0.0213835 24.4128 0.0148803C17.5473 -0.0669743 13.1701 0.184164 11.6099 0.885318C9.32102 1.9139 8.51435 2.49974 7.22333 4.21745C5.93449 5.78598 5.44478 9.27611 5.54944 14.9881C5.54944 14.9881 2.51324 14.9881 1.99849 14.988C1.48374 14.988 0.968969 15.3303 0.968994 16.0005C0.968994 16.434 0.968994 24.0304 0.968994 24.5072C0.968994 24.9839 1.38477 25.4811 2.00513 25.4811C2.59918 25.4811 5.58665 25.4811 5.58665 25.4811C5.58665 25.4811 5.58665 44.4268 5.58665 45.6179C5.58665 46.8089 6.73514 48 8.01212 48C8.46443 48 14.2488 48 15.5852 48C16.9215 48 18.0175 46.7291 17.9918 45.5954C17.9918 44.7448 17.9918 25.4811 17.9918 25.4811ZM9.2296 43.9035C9.22981 43.6969 9.25238 22.1518 9.25238 22.1518C9.25238 22.1518 5.30038 22.1518 5.07152 22.1518C4.84266 22.1518 4.6138 21.9208 4.6138 21.6762C4.6138 21.4972 4.6138 20.4098 4.6138 18.414C4.6138 18.2568 4.75392 17.9208 5.07979 17.9208C5.3871 17.9208 9.22913 17.8791 9.22913 17.8791L9.18427 16.2415C9.10132 10.6987 9.22913 8.08338 10.014 6.85019C10.7989 5.617 11.2152 5.27549 12.9646 4.47137C13.7838 4.09479 16.7084 3.98695 21.4897 4.00122C21.7661 4.00205 21.9895 4.22688 21.9878 4.50334C21.982 5.43069 21.9701 7.34209 21.9688 7.55293C21.9671 7.83254 21.7051 8.04547 21.4748 8.04547C20.4479 8.04547 18.3941 8.04547 18.3941 8.04547C16.9971 8.01585 15.9804 8.26506 15.3304 8.98861C14.7828 9.59826 14.5107 10.639 14.5505 11.4428V17.9254C14.5505 17.9254 20.9416 17.9255 21.2423 17.9255C21.5398 17.9255 21.7608 18.2265 21.7279 18.4859C21.6951 18.7454 21.3267 21.6568 21.3116 21.7763C21.2869 21.9712 21.0536 22.1661 20.8569 22.1661C20.6601 22.1661 14.5505 22.1661 14.5505 22.1661C14.5505 22.1661 14.5505 43.5892 14.5505 43.8683C14.5505 44.1473 14.3047 44.3498 14.0098 44.3498C11.2856 44.3498 9.84957 44.3498 9.70159 44.3498C9.46536 44.3498 9.22938 44.1101 9.2296 43.9035Z"
                  fill="white"
                ></path>
              </svg>
              <span>Facebook</span>
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/user/Ingressocom" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="52"
                height="39"
                viewBox="0 0 52 39"
                fill="none"
                className="injected-svg"
                data-src="/images/social-media/youtube.svg"
                role="img"
              >
                <title>Ícone do Youtube da ingresso.com</title>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.69192 0H42.3081C47.6608 0 52 4.55871 52 10.1822L52 10.2113L51.9496 28.71C51.9344 34.3062 47.6233 38.8406 42.2965 38.863L9.73069 38.9998C4.37804 39.0223 0.0214901 34.4819 7.75484e-05 28.8585L0 28.8177V10.1822C0 4.55871 4.33922 0 9.69192 0ZM9.69192 4.52541C6.7182 4.52541 4.30752 7.05803 4.30752 10.1822V28.8177L4.30756 28.8404C4.31946 31.9645 6.73976 34.487 9.71346 34.4745L42.2793 34.3376C45.2386 34.3252 47.6337 31.806 47.6421 28.697L47.6925 10.1983L47.6925 10.1822C47.6925 7.05803 45.2818 4.52541 42.3081 4.52541H9.69192ZM18.7356 11.9509V27.0062C18.7356 27.7521 19.5076 28.1024 20.0001 27.8561L34.9264 20.2779C35.5236 19.9627 35.4755 19.0281 34.9341 18.7264L19.97 11.1305C19.35 10.8608 18.7356 11.406 18.7356 11.9509ZM29.761 20.05C25.1762 22.3202 22.8006 23.4944 22.634 23.5726C22.3689 23.6972 21.9793 23.4559 21.9793 23.1496V16.0988C21.9793 15.7997 22.3751 15.5229 22.6487 15.6759C27.1294 17.89 29.4978 19.0606 29.7537 19.1875C30.1564 19.3872 30.0421 19.9109 29.761 20.05Z"
                  fill="white"
                ></path>
              </svg>
              <span>Youtube</span>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/ingressocom/" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                className="injected-svg"
                data-src="/images/social-media/instagram.svg"
                role="img"
              >
                <title>Ícone do Instagram da ingresso.com</title>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M33.5436 0.643311C41.0954 0.643311 47.2363 6.81613 47.2357 14.4067V33.5935C47.2357 41.1843 41.0952 47.3566 33.5436 47.3566H14.456C6.90472 47.3566 0.764404 41.1843 0.764404 33.5935V14.4067C0.764404 6.816 6.90483 0.643311 14.456 0.643311H33.5436ZM33.5436 4.53609H14.456C9.04366 4.53609 4.63701 8.96588 4.63701 14.4067V33.5935C4.63701 39.0344 9.0435 43.4639 14.456 43.4639H33.5436C38.9564 43.4639 43.3631 39.0343 43.3631 33.5935V14.4065C43.3635 8.96594 38.9565 4.53609 33.5436 4.53609ZM24.0001 12.3216C30.7729 12.3216 36.2633 17.8407 36.2633 24.6488C36.2633 31.4569 30.7729 36.9759 24.0001 36.9759C17.2272 36.9759 11.7368 31.4569 11.7368 24.6488C11.7368 17.8407 17.2272 12.3216 24.0001 12.3216ZM24.0001 16.1488C19.3056 16.1488 15.5001 19.9544 15.5001 24.6488C15.5001 29.3432 19.3056 33.1488 24.0001 33.1488C28.6945 33.1488 32.5001 29.3432 32.5001 24.6488C32.5001 19.9544 28.6945 16.1488 24.0001 16.1488ZM36.404 9.09012C38.0847 9.09012 39.4472 10.4597 39.4472 12.1492C39.4472 13.8386 38.0847 15.2082 36.404 15.2082C34.7233 15.2082 33.3608 13.8386 33.3608 12.1492C33.3608 10.4597 34.7233 9.09012 36.404 9.09012Z"
                  fill="white"
                ></path>
              </svg>
              <span>Instagram</span>
            </a>
          </li>
          <li>
            <a href="https://br.linkedin.com/company/ingressocom" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                className="injected-svg"
                data-src="/images/social-media/linkedin.svg"
                role="img"
              >
                <title>Ícone do LinkedIn da ingresso.com</title>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.80195 12.9781C3.41016 12.9781 0.666748 10.2469 0.666748 6.87685C0.666748 3.50695 3.41004 0.7771 6.80195 0.7771C10.1861 0.7771 12.9313 3.50945 12.9313 6.87685C12.9313 10.2444 10.1859 12.9781 6.80195 12.9781ZM41.2566 17.8873C39.4175 15.0632 36.3056 13.6311 31.8199 13.6311C29.3546 13.6311 27.1387 14.3526 25.4099 15.5444C25.273 14.8197 24.6334 14.2714 23.8651 14.2714H16.9497C15.29 14.2714 14.3477 15.5404 14.3477 16.6631V40.8719C14.3477 42.0338 15.5598 43.2227 16.7332 43.2227H23.2512C24.8102 43.2227 25.7692 41.9186 25.7692 40.7272V28.8861C25.7692 25.2131 26.563 23.8177 29.1688 23.8177C31.4074 23.8177 31.9026 25.0332 31.9026 29.1011V40.8335C31.9026 41.7443 32.7691 43.2227 34.322 43.2227H41.0147C42.053 43.2227 43.3334 42.0981 43.3334 40.9115V27.4956C43.3334 23.2423 42.7656 20.2046 41.2566 17.8873ZM31.8199 16.7586C38.198 16.7586 40.1896 19.8169 40.1896 27.4956V40.0951H35.0465V29.1011C35.0465 26.6128 34.9296 25.332 34.3734 23.9667C33.5231 21.8796 31.7646 20.6902 29.1688 20.6902C26.6032 20.6902 24.7516 21.6837 23.6975 23.5365C22.9059 24.928 22.6254 26.6221 22.6254 28.8861V40.0951H17.4916V17.399H22.2932V19.3648C22.2932 20.2284 22.997 20.9286 23.8651 20.9286H23.9769C24.5537 20.9286 25.0842 20.6142 25.359 20.1097C26.4014 18.1955 28.8032 16.7586 31.8199 16.7586ZM9.7874 6.87685C9.7874 8.51772 8.44896 9.85049 6.80195 9.85049C5.14698 9.85049 3.81061 8.52007 3.81061 6.87685C3.81061 5.23406 5.14654 3.90467 6.80195 3.90467C8.4494 3.90467 9.7874 5.23641 9.7874 6.87685ZM1.4268 40.8199V16.8039C1.4268 15.5554 2.49812 14.3872 3.86613 14.3872H9.79795C11.1186 14.3872 12.1712 15.7189 12.1712 16.7694V40.7864C12.1712 42.0046 11.0294 43.2227 9.82167 43.2227H4.02248C2.50316 43.2227 1.4268 42.0929 1.4268 40.8199ZM9.02734 17.5148V40.0951H4.57066V17.5148H9.02734Z"
                  fill="white"
                ></path>
              </svg>
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
