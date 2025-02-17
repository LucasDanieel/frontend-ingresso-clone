import "./styles.scss";

const Promotion = () => {
  const array = [
    {
      img: "https://ingresso-a.akamaihd.net/prd/img/passport-promotion/receba-r-20/44f031f0-7f8a-4960-b138-8e6370d28a83.webp",
      title: "Receba R$20",
      description: "Assine UOL e ganhe cupom de",
      price: "R$20,00 todo mês",
      date: "Até 30/11/2024",
    },
    {
      img: "https://ingresso-a.akamaihd.net/prd/img/passport-promotion/kinopass/e01a3441-741e-467c-b826-228f6324050a.webp",
      title: "Kinopass",
      description: "5 ingressos a partir de",
      price: "R$18,50 cada",
      date: "confira o regulamento",
    },
    {
      img: "https://ingresso-a.akamaihd.net/prd/img/passport-promotion/cinesystem-pass/807d44d4-1add-46da-8a87-a8f81d4c7bc1.webp",
      title: "Cinesystem Pass",
      description: "5 ingressos a partir de",
      price: "R$18,50 cada",
      date: "confira o regulamento",
    },
    {
      img: "https://ingresso-a.akamaihd.net/prd/img/passport-promotion/todos-pagam-meia/8a35780c-6caa-458c-a397-60e3a62baf1f.webp",
      title: "Todos pagam meia",
      description: "Segunda e terça",
      price: "a partir de R$12,00 + taxas",
      date: "toda segunda e terça exceto feriados",
    },
    {
      img: "https://ingresso-a.akamaihd.net/prd/img/passport-promotion/todos-pagam-meia/8a35780c-6caa-458c-a397-60e3a62baf1f.webp",
      title: "Todos pagam meia",
      description: "Segunda e terça",
      price: "a partir de R$12,00 + taxas",
      date: "toda segunda e terça exceto feriados",
    },
  ];

  return (
    <div className="container-promotion">
      <a href="">
        <div className="title-link">
          <h3>Promoções</h3>
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
      <div className="wrapper-promotion-scroll">
        {array.map((item, idx) => (
          <a href="" className="wrapper-promotion" key={idx}>
            <div className="promotion-img">
              <img src={item.img} alt="" />
            </div>
            <div className="wrapper-info-promotion">
              <div className="info-promotion">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p className="promotion-price">{item.price}</p>
                <div className="promotion-date">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="currentColor"
                    className="bi bi-clock"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                  </svg>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Promotion;
