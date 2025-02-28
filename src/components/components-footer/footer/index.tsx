import Instruction from "../instruction";
import DownloadApp from "../download-app";
import "./styles.scss";

const Footer = () => {
  return (
    <footer className="wrapper-footer">
      <DownloadApp />
      <div className="container-instruction">
        <Instruction />
      </div>
    </footer>
  );
};

export default Footer;
