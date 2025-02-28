import { MouseEvent, useRef, useState } from "react";
import "./styles.scss";
import OldMovieCard from "../old-movie-card";
import NewMovieCard from "../new-movie-card";
import { mouse_down, mouse_move, mouse_up, move_left, move_right } from "../../utils/scroll-methods";

type MoviesScrollProps = {
  title: string;
  title_link?: boolean;
};

export type OldFilmsProps = {
  name: string;
  age: number | string;
  img: string;
  premiere: string | null;
};

export type NewFilmsProps = {
  name: string;
  img: string;
  premiere: string | null;
  description: string;
  pre_venda: boolean;
};

const MoviesScroll = ({ title, title_link = false }: MoviesScrollProps) => {
  const [hiddenBefore, setHiddenBefore] = useState<boolean>(true);
  const [hiddenAfter, setHiddenAfter] = useState<boolean>(false);

  const refMovieScroll = useRef<HTMLDivElement>(null);

  const old_list_films: OldFilmsProps[] = [
    {
      name: "Coringa: Delírio A Dois",
      age: 16,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/coringa-delirio-a-dois/6eb6b44d-859b-4ffe-87fd-e728d55dc2f5.webp",
      premiere: "15/11",
    },
    {
      name: "Transformers: O Início",
      age: 10,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/transformers-o-inicio/101f391e-91e4-4fab-a18d-a1668e241e7a.webp",
      premiere: null,
    },
    {
      name: "A Substância",
      age: 18,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/a-substancia/7fcc65d8-a3d2-447c-8d04-144600a488fc.webp",
      premiere: "15/11",
    },
    {
      name: "Os Fantasmas Ainda Se Divertem: Beetlejuice Beetlejuice",
      age: 14,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/os-fantasmas-ainda-se-divertem-beetlejuice-beetlejuice/fd193783-6e4b-4d27-b6a9-ae3bfdd722ea.webp",
      premiere: null,
    },
    {
      name: "Pacto De Redenção",
      age: 14,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/pacto-de-redencao/b9931121-5649-47ce-9932-0488bc10f463.webp",
      premiere: null,
    },
    {
      name: "Golpe De Sorte Em Paris",
      age: 12,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/golpe-de-sorte-em-paris/c4c615fa-83a5-4e5d-b7fd-13427dc1bb4b.webp",
      premiere: null,
    },
    {
      name: "Look Back",
      age: 12,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/look-back/342d9331-c4a9-4d0c-a214-24f2e060e6cb.webp",
      premiere: null,
    },
    {
      name: "Não Fale O Mal",
      age: 18,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/nao-fale-o-mal/39eb53f1-024b-48a6-b00d-9d234b0783e5.webp",
      premiere: null,
    },
    {
      name: "Deadpool & Wolverine",
      age: 18,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/deadpool-e-wolverine/09f1e988-47fe-4d5e-88ec-a51051d3241f.webp",
      premiere: null,
    },
    {
      name: "Jung Kook: I Am Still",
      age: "L",
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/junk-kook-i-am-still/cfcf599f-693b-4716-964c-c20f77f7a18b.webp",
      premiere: null,
    },
    {
      name: "É Assim Que Acaba",
      age: 14,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/e-assim-que-acaba/baf2f184-c1ee-4210-a3d2-8c271b682e33.webp",
      premiere: null,
    },
    {
      name: "Longlegs - Vínculo Mortal",
      age: 18,
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/longlegs-vinculo-mortal/3b62f39c-8b5c-42a2-925a-8126749d8466.webp",
      premiere: null,
    },
    {
      name: "Meu Malvado Favorito 4",
      age: "L",
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/meu-malvado-favorito-4/4d756249-3b88-4b59-baa2-527f5e3d4c3e.webp",
      premiere: null,
    },
    {
      name: "Superman - O Filme (4K Remasterizado)",
      age: 12,
      img: "https://ingresso-a.akamaihd.net/img/cinema/cartaz/24059-cartaz.jpg",
      premiere: null,
    },
    {
      name: "A Menina E O Dragão",
      age: "L",
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/a-menina-e-o-dragao/1fee063d-364e-490d-928a-0a3a8e87540e.webp",
      premiere: null,
    },
  ];

  const new_list_films: NewFilmsProps[] = [
    {
      name: "Moana 2",
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/moana-2/c9be3635-7d11-4667-a1c7-5c50313e8bda.webp",
      premiere: "15/11",
      description:
        "Após receber um chamado inesperado de seus ancestrais, Moana deve viajar pelos mares distantes da Oceania e entrar em perigosas águas perdidas para viver uma aventura sem precedentes.",
      pre_venda: true,
    },
    {
      name: "Gladiador II",
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/gladiador-ii/df514161-7687-43cb-8a6c-f9d6fe6d7038.webp",
      premiere: null,
      description:
        "Do lendário diretor Ridley Scott, ‘Gladiador II’ continua a saga épica de poder, intriga e vingança ambientada na Roma Antiga. Anos depois de testemunhar a morte do venerado herói Maximus nas mãos de seu tio, Lucius (Paul Mescal) é forçado a entrar no Coliseu depois que seu lar é conquistado pelos imperadores tirânicos que agora comandam Roma com mão de ferro. Com a raiva em seu coração e o futuro do Império em jogo, Lucius deve olhar para o seu passado para encontrar força e honra para devolver a glória de Roma ao seu povo.",
      pre_venda: false,
    },
    {
      name: "Herege",
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/herege/04d8144d-c3e3-4d43-9d51-1957f836a00b.webp",
      premiere: "15/11",
      description:
        "Em HEREGE, duas jovens missionárias devotas acabam presas na casa de um homem misterioso (Hugh Grant). Elas são forçadas a participar de um jogo perturbador que desafia sua fé e põe em xeque tudo o que acreditam.",
      pre_venda: false,
    },
    {
      name: "Wicked",
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/wicked/e797ef40-0332-4b4e-bb51-cfe0d3737473.webp",
      premiere: null,
      description:
        "Baseado no musical homônimo da Broadway, Wicked é o prelúdio da famosa história de Dorothy e do Mágico de Oz, onde conhecemos a história não contada da Bruxa Boa e da Bruxa Má do Oeste. Na trama, Elphaba (Cynthia Erivo) é uma jovem como outra qualquer do Reino de Oz, mas incompreendida por causa de sua pele verde incomum e por ainda não ter descoberto seu verdadeiro poder. Sua rotina é tranquila e pouco interessante, mas ao iniciar seus estudos na Universidade de Shiz, seu destino encontra Glinda (Ariana Grande), uma jovem popular e ambiciosa, nascida em berço de ouro, que só quer garantir seus privilégios e ainda não conhece sua verdadeira alma. As duas iniciam uma inesperada amizade; no entanto, suas diferenças, como o desejo de Glinda pela popularidade e poder, e a determinação de Elphaba em permanecer fiel a si mesma, entram no caminho, o que pode perpetuar no futuro de cada uma e em como as pessoas de Oz as enxergam.",
      pre_venda: false,
    },
    {
      name: "Operação Natal",
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/operacao-natal/65cb5b4b-ea6c-49a0-bcc1-fc5b6e5e5831.webp",
      premiere: null,
      description:
        "Em OPERAÇÃO NATAL, depois que o Papai Noel – codinome: Das Neves – é sequestrado, o Chefe de Segurança do Polo Norte deve se unir ao mais infame caçador de recompensas do mundo em uma missão global e cheia de ação para salvar o Natal.",
      pre_venda: false,
    },
    {
      name: "A Arca de Noé",
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/a-arca-de-noe/903ce16f-5b07-4003-835b-a5358f0ce88e.webp",
      premiere: null,
      description:
        "Tom, um guitarrista talentoso e pragmático, e Vini, um poeta romântico e sonhador, são uma dupla carismática e caótica de ratos. Quando o grande dilúvio se aproxima, apenas um macho e uma fêmea de cada espécie são permitidos na Arca de Noé. Tom consegue entrar, mas Vini fica para fora e conta com a ajuda de uma barata engenhosa e a boa sorte do destino para se juntar ao amigo. Durante a viagem, brigas por território e alimentos se instauram, deixando os animais mais fortes contra os mais fracos. Surge a ideia de um concurso de música, que vira o maior objetivo de todos eles e que faz Tom e Vini, os verdadeiros músicos da arca, se destacarem e serem requisitados.",
      pre_venda: false,
    },
    {
      name: "Venom: A Última Rodada",
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/venom-a-ultima-rodada/a698de83-0f93-4ae0-a735-3f965706a3cf.webp",
      premiere: null,
      description:
        "Em Venom: A Última Rodada, Tom Hardy retorna ao papel de Venom, um dos maiores e mais complexos personagens da Marvel, para o filme final da trilogia. Eddie e Venom estão fugindo. Perseguidos pelos dois mundos, a dupla é obrigada a tomar uma decisão devastadora de que vai fechar as cortinas da última rodada de Venom e Eddie. ",
      pre_venda: false,
    },
    {
      name: "Todo Tempo Que Temos",
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/todo-tempo-que-temos/c6c7e503-cb7e-4bad-9063-682cef96a571.webp",
      premiere: null,
      description:
        "As vidas de Almut (Florence Pugh), um talentoso chef de cozinha, e Tobias (Andrew Garfield), um homem recém-divorciado, mudam para sempre quando eles se conhecem. Após um encontro inusitado, eles se apaixonam e constroem o lar e a família que sempre sonharam, até que uma verdade dolorosa põe à prova essa história de amor. Decididos a enfrentar as dificuldades, Almut e Tobias embarcam em uma jornada emocionante, onde aprenderão que a cada minuto conta quando estamos ao lado de quem amamos.",
      pre_venda: false,
    },
    {
      name: "Ainda Estou Aqui",
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/ainda-estou-aqui/b1360df3-9fbd-456b-b3fd-af7676cfc563.webp",
      premiere: null,
      description:
        "Rio de Janeiro, início dos anos 1970. O país enfrenta o endurecimento da ditadura militar. Os Paiva — Rubens, Eunice e seus cinco filhos — vivem na frente da praia, numa casa de portas abertas para os amigos. Um dia, Rubens é levado por militares à paisana e desaparece. Eunice, cuja busca pela verdade sobre o destino de seu marido se estenderia por décadas, é obrigada a se reinventar e traçar um novo futuro para si e seus filhos. Baseado no livro biográfico de Marcelo Rubens Paiva. ",
      pre_venda: false,
    },
    {
      name: "Pássaro Branco - Uma História De Extraordinário",
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/passaro-branco-uma-historia-de-extraordinario/6fb8bd18-f04c-4830-a2b5-ebc5a355dcae.webp",
      premiere: null,
      description: `De R.J. Palacio, autora do best-seller “Extraordinário” - o livro que desencadeou o movimento “escolha ser gentil” -, vem o próximo capítulo inspirador. Em Pássaro Branco – Uma História De Extraordinário, seguimos Julian (Bryce Gheisar), um menino que tenta se reencontrar desde que foi expulso de sua antiga escola pelo tratamento que teve com Auggie Pullman.

Para transformar sua vida, a avó de Julian (Helen Mirren) conta sua própria história de coragem durante sua juventude na França ocupada pela Segunda Guerra Mundial, onde um menino a protege de um perigo mortal. Eles encontram o primeiro amor em um mundo mágico e deslumbrante, criado pela imaginação deles, enquanto a mãe se arrisca para mantê-los seguros. Um filme inesquecível sobre como um ato de gentileza pode durar para sempre.
`,
      pre_venda: false,
    },
    {
      name: "Robô Selvagem",
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/robo-selvagem/64809d3e-206c-4b1b-9db5-88e6179a4798.webp",
      premiere: null,
      description:
        "A épica aventura acompanha a jornada de uma robô – a unidade ROZZUM 7134, “Roz” – que naufraga em uma ilha desabitada e precisa aprender a se adaptar ao ambiente hostil, construindo pouco a pouco relacionamentos com os animais nativos, e até adotando um filhotinho de ganso órfão.",
      pre_venda: false,
    },
    {
      name: "A Forja – O Poder Da Transformação",
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/a-forja-o-poder-da-transformacao/66030644-61fd-4939-83a1-04e0115ffe19.webp",
      premiere: null,
      description:
        "Um ano depois de encerrar o ensino médio, o jovem Isaías Wright não tem planos para o futuro e é desafiado por sua mãe solo e um empresário de sucesso a começar a traçar um rumo melhor para sua vida. Ele passa a ser discipulado pelo seu novo mentor, conta com orações de sua mãe e de uma guerreira de orações, Dona Clara, e começa a descobrir o propósito de Deus para sua vida.         ",
      pre_venda: false,
    },
    {
      name: "O Quarto Ao Lado",
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/o-quarto-ao-lado/d9041a6b-1e13-484d-800c-eb675db4738d.webp",
      premiere: null,
      description:
        "Ingrid (Julianne Moore) e Martha (Tilda Swinton) eram amigas muito próximas durante a juventude, quando trabalhavam juntas na mesma revista. Enquanto Ingrid tornou-se escritora, Martha seguiu carreira como repórter de guerra e as circunstâncias da vida as separaram. Após anos sem contato, elas se reencontram em uma situação extrema, porém estranhamente doce. ",
      pre_venda: false,
    },
    {
      name: "Daft Punk & Leiji Matsumoto: Interstella 5555",
      img: "https://www.ingresso.com/images/placeholder-movie-banner.jpg",
      premiere: null,
      description:
        "Interstella 5555 conta a história do sequestro de uma banda musical alienígena por um vilão humano que tem planos obscuros. O longa-metragem foi dividido em clipes de música para acompanhar o álbum Discovery, de Daft Punk, e é raro ver o filme em sua versão original nos cinemas.",
      pre_venda: false,
    },
    {
      name: "Megalópolis",
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/megalopolis/9b73f8ec-a952-46d6-bb5b-03c4f100b5e0.webp",
      premiere: null,
      description:
        "A cidade de Nova Roma é palco de um conflito épico entre Cesar Catilina, um artista genial a favor de um futuro utópico e idealista, e seu opositor, o ganancioso prefeito Franklyn Cicero. Entre os dois está Julia Cicero, com a lealdade dividida entre o pai e o amado, tentando decidir qual futuro a humanidade merece.",
      pre_venda: false,
    },
    {
      name: "Tudo Por Um Popstar 2",
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/tudo-por-um-popstar-2/c7718a05-7147-408c-878c-cc10cac2e2e1.webp",
      premiere: null,
      description:
        "Em TUDO POR UM POP STAR 2, para celebrar seus 15 anos de amizade, três amigas planejam uma viagem para assistir um show de um velho colega que se tornou um dos maiores pop stars do Brasil.",
      pre_venda: false,
    },
    {
      name: "A Substância",
      img: "https://ingresso-a.akamaihd.net/prd/img/movie/a-substancia/cf1fec21-acea-48e1-ab13-469e5bb65ad5.webp",
      premiere: null,
      description:
        "Após ser demitida da TV por ser considerada “velha demais” para sua atriz, Elisabeth Sparkle (Demi Moore) recorre a um sinistro programa de aprimoramento corporal. A substância milagrosa promete rejuvenescê-la, mas resulta em uma transformação ainda mais radical. Ela agora precisa dividir seu corpo com Sue (Margaret Qualley), sua versão jovem e melhorada, e, aos poucos, começa a perder completamente o controle da própria vida. Em um pesadelo surreal sobre a busca incessante pela juventude, A Substância revela o preço oculto da perfeição.",
      pre_venda: false,
    },
  ];

  const mouseMove = (e: MouseEvent<HTMLDivElement>) => {
    mouse_move(e, refMovieScroll);
  };

  const mouseDown = (e: MouseEvent<HTMLDivElement>) => {
    mouse_down(e, refMovieScroll);
  };

  const mouseUp = () => {
    mouse_up(refMovieScroll, setHiddenBefore, setHiddenAfter);
  };

  return (
    <div className="container-movie-scroll">
      {title_link ? (
        <a href="">
          <div className="title-link">
            <h3>{title}</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 3 11 10">
              <path d="m2.828 15.555 7.777-7.779L2.828 0 0 2.828l4.949 4.948L0 12.727l2.828 2.828z" />
            </svg>
          </div>
        </a>
      ) : (
        <h3>{title}</h3>
      )}
      <div
        className={`wrapper-movie-scroll${hiddenBefore ? " hidden-before" : ""}${hiddenAfter ? " hidden-after" : ""}`}
      >
        <div className="wrapper-buttons">
          <button className="left" onClick={() => move_left(refMovieScroll, setHiddenBefore, setHiddenAfter)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-left"
              viewBox="1 3 10 10"
            >
              <path
                fillRule="evenodd"
                stroke="currentColor"
                strokeWidth="0.4"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
              />
            </svg>
          </button>
          <button className="right" onClick={() => move_right(refMovieScroll, setHiddenBefore, setHiddenAfter)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-right"
              viewBox="3 3 10 10"
            >
              <path
                fillRule="evenodd"
                stroke="currentColor"
                strokeWidth="0.4"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
              />
            </svg>
          </button>
        </div>
        <div
          className="movie-scroll"
          ref={refMovieScroll}
          onMouseDown={mouseDown}
          onMouseMove={mouseMove}
          onMouseUp={mouseUp}
          onMouseLeave={mouseUp}
        >
          {title_link ? (
            <>
              {old_list_films.map((film, idx) => (
                <OldMovieCard key={idx} film={film} />
              ))}
            </>
          ) : (
            <>
              {new_list_films.map((film, idx) => (
                <NewMovieCard key={idx} film={film} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviesScroll;
