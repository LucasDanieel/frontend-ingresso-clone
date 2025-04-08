import { useEffect } from "react";
import "./styles.scss";

const Movies = () => {
  useEffect(() => {
    document.title = "Filmes em São Paulo - Ingresso.com";
  }, []);

  return (
    <div className="films">
      <h1>FILMES</h1>
    </div>
  );
};

export default Movies;
