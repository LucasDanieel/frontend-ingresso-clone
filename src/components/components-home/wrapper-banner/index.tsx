import "./styles.scss";
import Banner from "../banner";
import PremiereBanner from "../premiere-banner";

const WrapperBanner = () => {
  const film_detail = {
    name: "Coringa: Delírio A Dois",
    age: 16,
    type: "Drma, Suspense",
    description: `Após os eventos do primeiro filme, Arthur Fleck está internado em um hospital psiquiátrico. Ele é visitado por uma psiquiatra, a Dra. Harleen Quinzel, que fica fascinada por sua história. Juntos, eles exploram a mente de Arthur e os eventos que o levaram a se tornar o Coringa.`,
    img: "https://ingresso-a.akamaihd.net/prd/img/movie/coringa-delirio-a-dois/759db388-74d0-406e-a533-9a66704e0a70.webp",
  };

  const premiere_films = [
    {
      name: "A Forja – O Poder Da Transformação",
      age: "L",
      type: "Drama",
      description: `Um ano depois de encerrar o ensino médio, o jovem Isaías Wright não tem planos para o futuro e é desafiado por sua mãe solo e um empresário de sucesso a começar a traçar um rumo melhor para sua vida. Ele passa a
      ser discipulado pelo seu novo mentor, conta com orações de sua mãe e de uma guerreira de orações, Dona Clara, e começa a descobrir o propósito de Deus para sua vida.`,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/a-forja-o-poder-da-transformacao/66030644-61fd-4939-83a1-04e0115ffe19.webp",
      premiere: "15/11",
      pre_venda: false,
    },
    {
      name: "Transformers: O Início",
      age: 10,
      type: "Ação, Animação, Aventura",
      description: `O longa conta a história de origem de Optimus Prime e Megatron, os maiores rivais da franquia, mas que um dia foram amigos tão ligados quanto irmãos e que mudaram o destino de Cybertron para sempre.`,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/transformers-o-inicio/0e9e5fe0-18a0-4f12-a19e-8ddd1a52c751.webp",
      premiere: null,
      pre_venda: false,
    },
  ];

  return (
    <div className="wrapper-banner">
      <Banner film={film_detail} />
      {premiere_films.map((film) => (
        <PremiereBanner film={film} />
      ))}
    </div>
  );
};

export default WrapperBanner;
