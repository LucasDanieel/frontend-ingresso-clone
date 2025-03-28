import "./styles.scss";
import Banner from "../banner";
import PremiereBanner from "../premiere-banner";

const WrapperBanner = () => {
  const film_detail = {
    name: "Branca De Neve",
    age: 10,
    type: "Aventura, Fantasia",
    description: `No mais novo live-action Branca de Neve, uma rainha má e bela resolve, por inveja e vaidade, mandar matar sua enteada, BRANCA DE NEVE, a mais linda de todas. Mas o carrasco que deveria assassiná-la a deixa partir e, durante sua fuga pela floresta, encontra a cabana dos sete anões, que trabalham em uma mina e passam a protegê-la. Algum tempo depois, quando descobre que Branca de Neve, continua viva, a Bruxa Má, disfarça-se e vai atrás da moça com uma maçã envenenada, que faz com que Branca de Neve, caia em um sono profundo por toda a eternidade.`,
    img: "https://ingresso-a.akamaihd.net/prd/img/movie/branca-de-neve/8ee3907a-3017-4135-b02d-63349e825229.webp",
  };

  const premiere_films = [
    {
      name: "Vitória",
      age: "16",
      type: "Drama",
      description: `Inspirado em uma incrível história real, “Vitória”, interpretada pela indicada por Oscar Fernanda Montenegro, conta a emocionante trajetória de uma aposentada que desmontou uma perigosa quadrilha de traficantes e policiais a partir de filmagens feitas da janela de seu apartamento no Rio de Janeiro. Com a ajuda de um amigo jornalista, ela enfrenta os riscos e perigos de uma situação inimaginável. Um filme sobre a coragem, a força e a resiliência de uma mulher.`,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/vitoria/89c1acd9-d6cd-434e-858c-4e6b49a77dcd.webp",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "Capitão América: Admirável Mundo Novo ",
      age: 10,
      type: "Ação, Animação, Aventura",
      description: `Em CAPITÃO AMÉRICA: ADMIRÁVEL MUNDO NOVO, após a eleição de Thaddeus Ross como presidente dos Estados Unidos, Sam Wilson se encontra no meio de um incidente internacional e deve trabalhar para deter os verdadeiros cérebros por trás dele.`,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/capitao-america-admiravel-mundo-novo/aca396e0-35ae-4e8f-b00a-2c88c1478c7e.webp",
      premiere: null,
      pre_venda: false,
    },
  ];

  return (
    <div className="wrapper-banner">
      <Banner film={film_detail} />
      {premiere_films.map((film, idx) => (
        <PremiereBanner film={film} key={idx} />
      ))}
    </div>
  );
};

export default WrapperBanner;
