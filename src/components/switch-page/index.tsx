import "./styles.scss";

type switchPageProps = {
  firstName: string;
  lastName: string;
  firstHash: string;
  lastHash: string;
  switchValue: boolean;
  handleSwitchPage: (value: string) => void;
};

const SwitchPage = ({ firstName, lastName, firstHash, lastHash, switchValue, handleSwitchPage }: switchPageProps) => {
  return (
    <div className="wrapper-switch-page">
      <div className={`switch-page${switchValue ? " on" : ""}`} onClick={() => handleSwitchPage(firstHash)}>
        {firstName}
      </div>
      <div className={`switch-page${!switchValue ? " on" : ""}`} onClick={() => handleSwitchPage(lastHash)}>
        {lastName}
      </div>
    </div>
  );
};

export default SwitchPage;
