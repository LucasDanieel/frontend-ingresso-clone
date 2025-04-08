import { useEffect } from "react";
import "./styles.scss";
import { useParams } from "react-router-dom";

const Cinema = () => {
  const { slug } = useParams();

  useEffect(() => {
    document.title = "Cinemas em São Paulo - Ingresso.com";
  }, []);

  return (
    <div className="cinema">
      <h1>CINEMA {slug}</h1>
    </div>
  );
};

export default Cinema;
