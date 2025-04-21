import { useContext, useEffect, useState } from "react";
import "./styles.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContextType } from "../../@types/user";
import { UserContext } from "../../providers/user-provider";
import HeaderCinema from "../../components/components-cinema/header-cinema";
import SwitchPage from "../../components/switch-page";
import CarrosselSwitchDate from "../../components/carrossel-switch-date";
import CarrosselSessionsType from "../../components/carrossel-sessions-type";
import WrapperSession from "../../components/components-cinema/wrapper-session";

const Cinema = () => {
  const [switchValue, setSwitchValue] = useState<boolean>(true);
  const { slug } = useParams();

  const { actualCity } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    document.title = "Cinemas em São Paulo - Ingresso.com";
    // getCinemas();
  }, [actualCity]);

  const getCinemas = () => {
    if (!actualCity) return;

    axios
      .get(`cinema/get-with-sessions-by-slug?slug=${slug}`)
      .then((resp) => {
        console.log(resp.data);
        const data = resp.data.data;
        const grupos: any = {};

        for (const session of data.sessionsDTO) {
          const chave = [...session.type].sort().join(",");

          if (!grupos[chave]) {
            grupos[chave] = [];
          }

          grupos[chave].push(session);
        }

        const gruposArray = Object.entries(grupos).map(([tipo, sessoes]) => ({
          tipo: tipo.split(","),
          sessoes,
        }));

        console.log(gruposArray);
        console.log(grupos);
      })
      .catch((err) => console.error(err));
  };

  const handleSwitchPage = (hash: string) => {};

  return (
    <div className="container-cinema">
      <HeaderCinema />
      <div className="wrapper-content-cinema">
        <div className="container-switch-page">
          <SwitchPage
            firstName="Sessões"
            lastName="Detalhes"
            firstHash=""
            lastHash=""
            switchValue={switchValue}
            handleSwitchPage={handleSwitchPage}
          />
        </div>
        <CarrosselSwitchDate />
        <CarrosselSessionsType />
        <div className="title-all-programming">
          <h3>Toda a Programação</h3>
        </div>
        <div className="container-sessions">
          <WrapperSession />
          <WrapperSession />
        </div>
      </div>
    </div>
  );
};

export default Cinema;
