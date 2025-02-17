import "./styles.scss";

import MoviesScroll from "../../components/movies-scroll";
import Banner from "../../components/components-home/banner";
import News from "../../components/components-home/news";
import NearbyCinema from "../../components/components-home/nearby-cinema";
import Promotion from "../../components/components-home/promotion";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    document.title = "Ingresso.com - Aqui começa o seu momento!";
  }, []);

  return (
    <div>
      <main className="home-main-container">
        <Banner />
        <div className="main-container">
          <div className="main-wrapper">
            <MoviesScroll title="Em Alta" />
            <MoviesScroll title="Em Cartaz" title_link />
            <News />
            <NearbyCinema />
            <MoviesScroll title="Em Breve" title_link />
            <Promotion />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
