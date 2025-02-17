import { useEffect } from "react";
import "./styles.scss";

const Events = () => {
  useEffect(() => {
    document.title = "Eventos - Ingresso.com";
  }, []);

  return (
    <div className="eventos">
      <h1>EVENTOS</h1>
    </div>
  );
};

export default Events;
