import { useEffect } from "react";
import "./styles.scss";

const Cinemas = () => {
  useEffect(() => {
    document.title = "Cinemas em São Paulo - Ingresso.com";
  }, []);

  return (
    <div className="cinemas">
      <h1>CINEMAS</h1>
    </div>
  );
};

export default Cinemas;
