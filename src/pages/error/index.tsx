import ButtonTransparent from "../../components/buttons-styles/button-transparent";
import "./styles.scss";

const Error = () => {
  return (
    <div className="container-error">
      <div className="wrapper-error">
        <h1>ERRO 404</h1>
        <p>Não encontramos a página que você está procurando :(</p>
        <img src="https://ingresso-a.akamaihd.net/catalog/Content/img/error-img-03176b1a6d.jpg" alt="" />
        <span>Isso pode ter acontecido porque:</span>
        <ul>
          <li>Essa página não existe mais</li>
          <li>Você digitou algo errado</li>
          <li>Estamos tão confusos quanto o John Travolta</li>
        </ul>
        <span>Tente novamente!</span>
        <div className="button-go-home">
          <ButtonTransparent text="Ir para a Home" />
        </div>
      </div>
    </div>
  );
};

export default Error;
