import { IconClock } from "../../../icons";
import WrapperScroll from "../wrapper-scroll";
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
    // {
    //   img: "https://ingresso-a.akamaihd.net/prd/img/passport-promotion/todos-pagam-meia/8a35780c-6caa-458c-a397-60e3a62baf1f.webp",
    //   title: "Todos pagam meia",
    //   description: "Segunda e terça",
    //   price: "a partir de R$12,00 + taxas",
    //   date: "toda segunda e terça exceto feriados",
    // },
  ];

  return (
    <WrapperScroll title="Promoções" title_link promotion>
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
                <IconClock />
                <span>{item.date}</span>
              </div>
            </div>
          </div>
        </a>
      ))}
    </WrapperScroll>
  );
};

export default Promotion;
