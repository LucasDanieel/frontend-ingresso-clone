import { useEffect } from "react";
import "./styles.scss";

const Theaters = () => {
  useEffect(() => {
    document.title = "Teatros - Ingresso.com";
  }, []);

  return (
    <div className="teatros">
      <h1>TEATROS</h1>
    </div>
  );
};

export default Theaters;
