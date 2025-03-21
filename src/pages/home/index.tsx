import { useEffect } from "react";
import "./styles.scss";

import WrapperBanner from "../../components/components-home/wrapper-banner";
import News from "../../components/components-home/news";
import NearbyCinema from "../../components/components-home/nearby-cinema";
import Promotion from "../../components/components-home/promotion";
import TrendingMovies from "../../components/components-home/trending-movies";
import MoviesOnDisplay from "../../components/components-home/movies-on-display";
import MoviesComingSoon from "../../components/components-home/movies-coming-soon";
import { FilmsProps } from "../../@types/movie";

function Home() {
  useEffect(() => {
    document.title = "Ingresso.com - Aqui começa o seu momento!";
  }, []);

  const old_list_films: FilmsProps[] = [
    {
      name: "Coringa: Delírio A Dois",
      age: 16,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/coringa-delirio-a-dois/6eb6b44d-859b-4ffe-87fd-e728d55dc2f5.webp",
      premiere: "15/11",
      pre_venda: false,
    },
    {
      name: "Transformers: O Início",
      age: 10,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/transformers-o-inicio/101f391e-91e4-4fab-a18d-a1668e241e7a.webp",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "A Substância",
      age: 18,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/a-substancia/7fcc65d8-a3d2-447c-8d04-144600a488fc.webp",
      premiere: "15/11",
      pre_venda: false,
    },
    {
      name: "Os Fantasmas Ainda Se Divertem: Beetlejuice Beetlejuice",
      age: 14,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/os-fantasmas-ainda-se-divertem-beetlejuice-beetlejuice/fd193783-6e4b-4d27-b6a9-ae3bfdd722ea.webp",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "Pacto De Redenção",
      age: 14,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/pacto-de-redencao/b9931121-5649-47ce-9932-0488bc10f463.webp",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "Golpe De Sorte Em Paris",
      age: 12,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/golpe-de-sorte-em-paris/c4c615fa-83a5-4e5d-b7fd-13427dc1bb4b.webp",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "Look Back",
      age: 12,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/look-back/342d9331-c4a9-4d0c-a214-24f2e060e6cb.webp",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "Não Fale O Mal",
      age: 18,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/nao-fale-o-mal/39eb53f1-024b-48a6-b00d-9d234b0783e5.webp",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "Deadpool & Wolverine",
      age: 18,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/deadpool-e-wolverine/09f1e988-47fe-4d5e-88ec-a51051d3241f.webp",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "Jung Kook: I Am Still",
      age: "L",
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/junk-kook-i-am-still/cfcf599f-693b-4716-964c-c20f77f7a18b.webp",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "É Assim Que Acaba",
      age: 14,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/e-assim-que-acaba/baf2f184-c1ee-4210-a3d2-8c271b682e33.webp",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "Longlegs - Vínculo Mortal",
      age: 18,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/longlegs-vinculo-mortal/3b62f39c-8b5c-42a2-925a-8126749d8466.webp",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "Meu Malvado Favorito 4",
      age: "L",
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/meu-malvado-favorito-4/4d756249-3b88-4b59-baa2-527f5e3d4c3e.webp",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "Superman - O Filme (4K Remasterizado)",
      age: 12,
      img: "https://ingresso-a.akamaihd.net/img/cinema/cartaz/24059-cartaz.jpg",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "A Menina E O Dragão",
      age: "L",
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/a-menina-e-o-dragao/1fee063d-364e-490d-928a-0a3a8e87540e.webp",
      premiere: null,
      pre_venda: false,
    },
  ];

  const new_list_films: FilmsProps[] = [
    {
      name: "O Brutalista",
      age: 18,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/o-brutalista/016c5965-f6d8-4d84-aaeb-abafc4af19e7.webp",
      premiere: "15/11",
      pre_venda: true,
    },
    {
      name: "Attack On Titan: O Último Ataque",
      age: 18,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/attack-on-titan/1a074678-07b9-4109-b905-35a3316a40e5.webp",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "Herege",
      age: "L",
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/herege/04d8144d-c3e3-4d43-9d51-1957f836a00b.webp",
      premiere: "15/11",
      pre_venda: false,
    },
    {
      name: "Wicked",
      age: 16,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/wicked/e797ef40-0332-4b4e-bb51-cfe0d3737473.webp",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "Operação Natal",
      age: 16,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/operacao-natal/65cb5b4b-ea6c-49a0-bcc1-fc5b6e5e5831.webp",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "A Arca de Noé",
      age: 16,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/a-arca-de-noe/903ce16f-5b07-4003-835b-a5358f0ce88e.webp",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "Venom: A Última Rodada",
      age: 16,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/venom-a-ultima-rodada/a698de83-0f93-4ae0-a735-3f965706a3cf.webp",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "Todo Tempo Que Temos",
      age: 16,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/todo-tempo-que-temos/c6c7e503-cb7e-4bad-9063-682cef96a571.webp",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "Ainda Estou Aqui",
      age: 16,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/ainda-estou-aqui/b1360df3-9fbd-456b-b3fd-af7676cfc563.webp",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "Pássaro Branco - Uma História De Extraordinário",
      age: 16,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/passaro-branco-uma-historia-de-extraordinario/6fb8bd18-f04c-4830-a2b5-ebc5a355dcae.webp",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "Robô Selvagem",
      age: 16,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/robo-selvagem/64809d3e-206c-4b1b-9db5-88e6179a4798.webp",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "A Forja – O Poder Da Transformação",
      age: 16,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/a-forja-o-poder-da-transformacao/66030644-61fd-4939-83a1-04e0115ffe19.webp",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "O Quarto Ao Lado",
      age: 16,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/o-quarto-ao-lado/d9041a6b-1e13-484d-800c-eb675db4738d.webp",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "Daft Punk & Leiji Matsumoto: Interstella 5555",
      age: 16,
      img: "https://www.ingresso.com/images/placeholder-movie-banner.jpg",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "Megalópolis",
      age: 16,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/megalopolis/9b73f8ec-a952-46d6-bb5b-03c4f100b5e0.webp",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "Tudo Por Um Popstar 2",
      age: 16,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/tudo-por-um-popstar-2/c7718a05-7147-408c-878c-cc10cac2e2e1.webp",
      premiere: null,
      pre_venda: false,
    },
    {
      name: "A Substância",
      age: 16,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/a-substancia/cf1fec21-acea-48e1-ab13-469e5bb65ad5.webp",
      premiere: null,
      pre_venda: false,
    },
  ];

  return (
    <div>
      <main className="container-main-home">
        <WrapperBanner />
        <div className="wrapper-main-home">
          <div className="main-home">
            <TrendingMovies list_films={new_list_films} />
            <MoviesOnDisplay list_films={old_list_films} />
            <News />
            <NearbyCinema />
            <MoviesComingSoon list_films={old_list_films} />
            <Promotion />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
