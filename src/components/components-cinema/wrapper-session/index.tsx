import WrapperSessionBanner from "../wrapper-session-banner";
import WrapperSessionDescriptionHeader from "../wrapper-session-description-header";
import WrapperSessionTypeAndTime from "../wrapper-session-type-and-time";
import "./styles.scss";

const WrapperSession = () => {
  return (
    <div className="wrapper-session">
      <WrapperSessionBanner />
      <div className="wrapper-session-description">
        <WrapperSessionDescriptionHeader />
        <div className="wrapper-session-border-line">
          <div className="session-border-line"></div>
        </div>
        <div className="container-session-types-and-times">
          <WrapperSessionTypeAndTime />
        </div>
      </div>
    </div>
  );
};

export default WrapperSession;
