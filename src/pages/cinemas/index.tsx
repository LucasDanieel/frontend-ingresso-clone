import { useContext, useEffect } from "react";
import "./styles.scss";
import axios from "axios";
import { UserContext } from "../../providers/user-provider";
import { UserContextType } from "../../@types/user";

const Cinemas = () => {
  const { actualCity } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    document.title = `Cinemas em ${actualCity?.name} - Ingresso.com`;

    axios
      .get("cinema/get-slug?slug=cidade-teste-1")
      .then((resp) => {
        console.log(resp.data.data);
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
  }, [actualCity]);

  return (
    <div className="cinemas">
      <h1>CINEMAS</h1>
    </div>
  );
};

export default Cinemas;
