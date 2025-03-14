import "./styles.scss";

const DownloadApp = () => {
  return (
    <div className="wrapper-download-app">
      <div className="download-app">
        <strong>Baixe nosso aplicativo</strong>
        <div className="options-download">
          <a href="https://apps.apple.com/br/app/ingresso-com-filmes-cinemas/id1165054492" target="_blank">
            <img src="\assets\img\app-store.png" alt="" />
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.ingresso.cinemas&hl=pt_BR&pli=1" target="_blank">
            <img src="\assets\img\google-play.png" alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
