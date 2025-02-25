import Cookies from "js-cookie";
import axios from "axios";
import "./styles.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
          Cookies.set("token", resp.data);
          navigate("/minha-conta/edicao-de-cadastro")
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
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 23 23">
          <g fill="none" fillRule="evenodd">
            <rect width="26" height="26" fill="#21262D" rx="1"></rect>
            <path
              fill="#D7282A"
              d="M3.99 7.956c.374-.806.903-1.51 1.524-2.146 1.404-1.44 3.104-2.363 5.117-2.677 2.817-.44 5.338.21 7.516 2.045.138.116.172.184.022.327-.769.737-1.526 1.486-2.287 2.23-.078.077-.13.17-.27.046-1.917-1.72-5.048-1.7-7.086.154a5.72 5.72 0 0 0-1.524 2.275c-.047-.03-.097-.058-.142-.091L3.99 7.956"
            ></path>
            <path
              fill="#45AC43"
              d="M6.98 13.723c.275.683.616 1.329 1.124 1.878 1.291 1.395 2.892 1.997 4.81 1.802.89-.09 1.702-.386 2.461-.84.073.064.142.132.219.191.887.678 1.776 1.355 2.665 2.032a7.68 7.68 0 0 1-3.438 1.839c-3.068.759-5.897.28-8.408-1.66A8.377 8.377 0 0 1 3.982 16l2.998-2.277"
            ></path>
            <path
              fill="#4485F4"
              d="M18.259 18.786c-.889-.677-1.778-1.354-2.665-2.032-.077-.059-.146-.127-.219-.19.602-.45 1.104-.98 1.433-1.656a5.72 5.72 0 0 0 .312-.836c.06-.196.041-.273-.207-.27-1.48.012-2.958.005-4.437.005-.313 0-.313 0-.313-.317 0-.98.004-1.962-.005-2.942-.001-.19.032-.262.25-.262 2.728.008 5.456.006 8.183.003.148 0 .24.01.266.186.34 2.334.067 4.565-1.181 6.625-.383.63-.842 1.207-1.417 1.686"
            ></path>
            <path
              fill="#F4C300"
              d="M6.98 13.723 3.982 16c-.488-.888-.77-1.841-.9-2.835a8.707 8.707 0 0 1 .768-4.957c.04-.086.093-.168.14-.252l2.87 2.163c.045.033.095.06.142.091-.4 1.169-.38 2.34-.022 3.513"
            ></path>
          </g>
        </svg>
        <span>Continuar com o Google</span>
      </button>
    </div>
  );
};

export default LoginWithGoogle;
