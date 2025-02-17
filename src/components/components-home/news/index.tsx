import "./styles.scss";

const News = () => {
  const mapsArray = [
    {
      title:
        "Disney divulga data de estreia do live-action 'Lilo e Stitch' no Brasil; saiba mais",
      description: "Novo filme adapta a animação homônima do estúdio",
      img: "https://ingresso-a.akamaihd.net/b2b/production/uploads/article/image/2686/4ef83b2b593853913eb19bd073c2054a.jpg",
    },
    {
      title:
        "Fernanda Montenegro comemora 95 anos; confira a lista de filmes marcantes da atriz, e onde assistir",
      description:
        "‘Ainda Estou Aqui’ e ‘Vitória’, próximos projetos da veterana indicada ao Oscar, chegam às telonas em breve",
      img: "https://ingresso-a.akamaihd.net/b2b/production/uploads/article/image/2685/b50b5b7f722c18f1c6d546ba9645898c.jpg",
    },
    {
      title:
        "Inspirado na obra de Stephen King, terror ‘O Macaco’ ganha trailer arrepiante; assista",
      description:
        "Theo James (‘Divergente’) estrela o longa, que chega às telonas em fevereiro de 2025",
      img: "https://ingresso-a.akamaihd.net/b2b/production/uploads/article/image/2684/a44efc0c41151f54e20124088050a1cf.jpg",
    },
    {
      title:
        "Como Christopher Reeve, o eterno Superman, transformou a luta por direitos das pessoas com paralisia",
      description:
        "Documentário sobre a trajetória do ator estreia nos cinemas esta semana",
      img: "https://ingresso-a.akamaihd.net/b2b/production/uploads/article/image/2683/e6ebf6db8cfa2cc3529cb94c6cc4c40c.jpg",
    },
    {
      title: "Francis Ford Coppola virá ao Brasil para promover ‘Megalópolis’",
      description:
        "Novo filme do renomado diretor chega às telonas no final deste mês",
      img: "https://ingresso-a.akamaihd.net/b2b/production/uploads/article/image/2682/b11b53b556ac0c1b77ea052d6ef56c8f.jpg",
    },
    {
      title:
        "Pré-venda de 'Som da Esperança - A História de Possum Trot' já tem data para começar no Brasil",
      description: "Drama estreia em 31 de outubro nos cinemas nacionais",
      img: "https://ingresso-a.akamaihd.net/b2b/production/uploads/article/image/2681/f7f6a01fef41b07f6267ca6450801d29.jpg",
    },
    {
      title:
        "Sequência da comédia teen, 'Sexta-Feira Muito Louca 2' ganha data de estreia nos cinemas do Brasil",
      description:
        "Jamie Lee Curtis e Lindsay Lohan retornam aos seus papéis na continuação",
      img: "https://ingresso-a.akamaihd.net/b2b/production/uploads/article/image/2680/c9ceeef67a91747ef313460d8273b1ae.jpg",
    },
  ];
  return (
    <div className="container-news">
      <a href="">
        <div className="title-link">
          <h3>Notícias</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="16"
            viewBox="0 3 11 10"
          >
            <path d="m2.828 15.555 7.777-7.779L2.828 0 0 2.828l4.949 4.948L0 12.727l2.828 2.828z" />
          </svg>
        </div>
      </a>
      <div className="wrapper-news">
        {mapsArray.map((arr, idx) => (
          <div className="news" key={idx}>
            <img src={arr.img} alt="" />
            <a className="wrapper-description-news" href="">
              <div className="description-news">
                <h3>{arr.title}</h3>
                <span>{arr.description}</span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
