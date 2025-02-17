import { useEffect } from "react";
import "./styles.scss";

const News = () => {
  useEffect(() => {
    document.title = "Notícias - Ingresso.com";
  }, []);

  return (
    <div className="noticias">
      <h1>NOTICIAS</h1>
    </div>
  );
};

export default News;
