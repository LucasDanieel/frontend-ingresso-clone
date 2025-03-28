import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import "./styles.scss";

const LoginWithGoogle = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessTokenRegex = /access_token=([^&]+)/;
    const isMatch = window.location.href.match(accessTokenRegex);

    if (isMatch) {
      const accessToken = isMatch[1];
      Cookies.set("access_token", accessToken);
      getEmailInformation(accessToken);
    }
  }, []);

  const getEmailInformation = async (accessToken: string) => {
    const googleData = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
    );

    if (googleData.data.verified_email) {
      axios
        .get(`/user/login-via-google?email=${googleData.data.email}`)
        .then((resp) => {
          const { token, name, email} = resp.data;
          Cookies.set("token", token, { expires: 10 });
          Cookies.set("info_profile", JSON.stringify({ name: name, email: email }), {
            expires: 10,
          });
          navigate("/minha-conta/edicao-de-cadastro");
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  };

  const onLoginGoogle = () => {
    const callbackUrl = window.location.href;
    const clientId = import.meta.env.VITE_CLIENT_ID;

    window.location.href = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=token&client_id=${clientId}&scope=openid%20email%20profile`;
  };

  return (
    <div className="wrapper-login-with-google">
      <button type="button" className="login-with-google" onClick={onLoginGoogle}>
        <svg width="26" height="26">
          <use xlinkHref="/assets/icons.svg#icon-google"></use>
        </svg>
        <span>Continuar com o Google</span>
      </button>
    </div>
  );
};

export default LoginWithGoogle;
