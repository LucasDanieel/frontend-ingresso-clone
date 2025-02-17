import { memo } from "react";
import ButtonStyle from "../../button-style";
import "./styles.scss";

const Banner = memo(() => {
  const film_detail = {
    name: "Coringa: Delírio A Dois",
    age: 16,
    type: "Drma, Suspense",
    description: `Após os eventos do primeiro filme, Arthur Fleck está internado em um hospital psiquiátrico. Ele é visitado por uma psiquiatra, a Dra. Harleen Quinzel, que fica fascinada por sua história. Juntos, eles exploram a mente de Arthur e os eventos que o levaram a se tornar o Coringa.`,
    img: "https://ingresso-a.akamaihd.net/prd/img/movie/coringa-delirio-a-dois/759db388-74d0-406e-a533-9a66704e0a70.webp",
  };

  return (
    <div className="wrapper-banner">
      <div className="banner">
        <img src={film_detail.img} alt="" />
        <a className="container-description" href="">
          <div className="wrapper-description">
            <div className="wrapper-age">
              <div className={`age BG${film_detail.age}`}>{film_detail.age}</div>
              <span>{film_detail.type}</span>
            </div>
            <h1>{film_detail.name}</h1>
            <span className="description">{film_detail.description}</span>
          </div>
        </a>
        <div className="wrapper-ticket">
          <ButtonStyle text="Ingressos" />
          <button>Assistir Trailer</button>
        </div>
      </div>
      <div className="premiere-films">
        <img
          src="https://ingresso-a.akamaihd.net/prd/img/movie/a-forja-o-poder-da-transformacao/66030644-61fd-4939-83a1-04e0115ffe19.webp"
          alt=""
        />
        <a className="container-description" href="">
          <div className="wrapper-description">
            <div className="wrapper-tags">{/* <span>ESTREIA HOJE</span> */}</div>
            <div className="wrapper-age">
              <div className={`age BGL`}>L</div>
              <span>Drama</span>
            </div>
            <h2>A Forja – O Poder Da Transformação</h2>
            <span className="description-premiere-films">
              Um ano depois de encerrar o ensino médio, o jovem Isaías Wright não tem planos para o futuro e é
              desafiado por sua mãe solo e um empresário de sucesso a começar a traçar um rumo melhor para sua
              vida. Ele passa a ser discipulado pelo seu novo mentor, conta com orações de sua mãe e de uma
              guerreira de orações, Dona Clara, e começa a descobrir o propósito de Deus para sua vida.
            </span>
          </div>
        </a>
      </div>
      <div className="premiere-films">
        <img
          src="https://ingresso-a.akamaihd.net/prd/img/movie/transformers-o-inicio/0e9e5fe0-18a0-4f12-a19e-8ddd1a52c751.webp"
          alt=""
        />
        <a className="container-description" href="">
          <div className="wrapper-description">
            <div className="wrapper-tags">
              {/* <span>PRÉ-VENDA</span>
              <span>ESTREIA 03/10</span> */}
            </div>
            <div className="wrapper-age">
              <div className={`age BG10`}>10</div>
              <span>Ação, Animação, Aventura</span>
            </div>
            <h2>Transformers: O Início</h2>
            <span className="description-premiere-films">
              O longa conta a história de origem de Optimus Prime e Megatron, os maiores rivais da franquia,
              mas que um dia foram amigos tão ligados quanto irmãos e que mudaram o destino de Cybertron para
              sempre.
            </span>
          </div>
        </a>
      </div>
    </div>
  );
});
export default Banner;
