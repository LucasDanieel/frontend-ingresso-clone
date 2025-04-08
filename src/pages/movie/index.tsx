import { useParams } from "react-router-dom";
import "./styles.scss";
import { useContext, useEffect } from "react";
import { UserContextType } from "../../@types/user";
import { UserContext } from "../../providers/user-provider";

const Movie = () => {
  const { slug } = useParams();

  const { user } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    document.title = `${slug} - Ingresso.com`;
  }, []);

  return (
    <div className="film">
      <h1>{user?.email}</h1>
    </div>
  );
};

export default Movie;
