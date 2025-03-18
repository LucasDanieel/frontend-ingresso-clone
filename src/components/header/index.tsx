import { useEffect, useRef, useState } from "react";
import "./styles.scss";
import ButtonStyle from "../button-style";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [cityBool, setCityBool] = useState<boolean>(false);
  const [searcheBool, setSearcheBool] = useState<boolean>(false);
  const [loginBool, setLoginBool] = useState<boolean>(false);
  const [helpBool, setHelpBool] = useState<boolean>(false);

  const refCity = useRef<HTMLButtonElement>(null);
  const refSearch = useRef<HTMLButtonElement>(null);
  const refLogin = useRef<HTMLButtonElement>(null);
  const refHelp = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.addEventListener("click", clickDocument);

    return () => {
      document.removeEventListener("click", clickDocument);
    };
  }, []);

  const clickDocument = (e: MouseEvent) => {
    const dropDown = document.querySelector(".container-dropdown");
    if (
      refCity.current?.contains(e.target as Node) ||
      refSearch.current?.contains(e.target as Node) ||
      refLogin.current?.contains(e.target as Node) ||
      refHelp.current?.contains(e.target as Node) ||
      dropDown?.contains(e.target as Node)
    ) {
      return;
    }

    setCityBool(false);
    setSearcheBool(false);
    setLoginBool(false);
    setHelpBool(false);
  };

  const [left, setLeft] = useState<number>(0);

  const switchBool = (whitch: string) => {
    if (cityBool == true) setCityBool(false);
    if (searcheBool == true) setSearcheBool(false);
    if (loginBool == true) setLoginBool(false);
    if (helpBool == true) setHelpBool(false);

    switch (whitch) {
      case "city":
        cityBool == false ? setCityBool(true) : setCityBool(false);

        calc_position(refCity.current);
        break;
      case "search":
        searcheBool == false ? setSearcheBool(true) : setSearcheBool(false);

        calc_position(refSearch.current);
        break;
      case "login":
        loginBool == false ? setLoginBool(true) : setLoginBool(false);

        calc_position(refLogin.current);
        break;
      case "help":
        helpBool == false ? setHelpBool(true) : setHelpBool(false);

        calc_position(refHelp.current);
        break;
    }
  };

  const calc_position = (component_ref: HTMLButtonElement | null) => {
    if (component_ref) {
      const rect_result = component_ref.getBoundingClientRect();
      const result = rect_result.left + rect_result.width / 2;

      if (rect_result) setLeft(result);

      setTimeout(() => {
        const html = document.querySelector(".container-dropdown");

        if (html) {
          const icon = html.querySelector(".icon-arrow");
          const rect = html.getBoundingClientRect();

          if (rect.left + rect.width > window.innerWidth)
            (html as HTMLElement).style.left = `${window.innerWidth - rect.width / 2 - 16}px`;

          (html as HTMLElement).style.top = "66px";

          const rect2 = html.getBoundingClientRect();
          (icon as HTMLElement).style.left = `${result - rect2.left - 12}px`;
        }
      }, 10);
    }
  };

  return (
    <header className="container-header">
      <div className="primary-header">
        <div className="header-elements">
          <a className="icon-ingresso" href="http://localhost:5173/">
            <div className="logo-header">
              <img
                src="https://ingresso-a.akamaihd.net/catalog/img/ingresso-logo-v1-desktop-final.svg"
                alt="INGRESSO"
              />
            </div>
          </a>
          <button onClick={() => switchBool("city")} ref={refCity} className="header-buttons">
            <div className="city-header">
              <div className="icon-point">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="27"
                  fill="currentColor"
                  className="bi bi-geo-alt"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
              </div>
              <p>São Paulo</p>
            </div>
          </button>
          {cityBool && (
            <div className="container-dropdown" style={{ left: left }}>
              <div className="dropdown">
                <div className="container-location">
                  <div className="location">
                    <h3>Você está em: São Paulo</h3>
                    <a href="" className="gps">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-cursor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52z" />
                      </svg>
                      <span>Atualizar localização por GPS</span>
                    </a>
                    <div className="select-box">
                      <div className="select">
                        <select name="" id="">
                          <option value="0">Estado</option>
                        </select>
                        <div className="select-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-chevron-down"
                            viewBox="0 0 15 15"
                          >
                            <path
                              fillRule="evenodd"
                              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="select">
                        <select name="" id="">
                          <option value="0">Cidade</option>
                        </select>
                        <div className="select-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-chevron-down"
                            viewBox="0 0 15 15"
                          >
                            <path
                              fillRule="evenodd"
                              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                            />
                          </svg>
                        </div>
                      </div>
                      <ButtonStyle text="Trocar Cidade" style_width={true} />
                    </div>
                  </div>
                  <div className="wrapper-last-location">
                    <h3>Últimos Locais</h3>
                    <ul>
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 64 64"
                          version="1.1"
                          className="injected-svg"
                          data-src="/images/recent.svg"
                          role="img"
                        >
                          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g transform="translate(-668.000000, -4508.000000)" fill="currentColor">
                              <g transform="translate(668.000000, 4508.000000)">
                                <g>
                                  <path
                                    d="M54.9234692,25.4876308 L62.515364,33.6224722 C62.5251428,33.6329503 62.5347957,33.6435451 62.5443208,33.6542544 C63.2033478,34.3952133 63.1369289,35.5301262 62.3959699,36.1891532 C61.6326858,36.8680368 60.4665142,36.8113784 59.7726368,36.0616986 L59.7726368,36.0616986 L57.2750658,33.3626788 C56.4036914,46.1946037 45.7187555,56.3333333 32.6657924,56.3333333 C25.4344392,56.3333333 18.9298738,53.221585 14.4180774,48.2640696 L14.3945183,48.2877713 L13.6966084,47.6204018 C13.6705567,47.5954902 13.6451885,47.5698735 13.6205319,47.5435803 C12.8706968,46.7439711 12.9110465,45.4878984 13.7106556,44.7380632 C14.5572568,43.9441611 15.8854977,43.9808935 16.6869279,44.8203717 L16.6869279,44.8203717 L16.905,45.049 L16.9779938,45.0029517 C20.7584678,49.5463639 26.4555119,52.4385965 32.8280731,52.4385965 C43.7268622,52.4385965 52.649752,43.9787655 53.3882946,33.2675511 L50.6471221,36.6882218 C50.0067045,37.4873238 48.8474346,37.6334122 48.0287858,37.0181782 C48.0137997,37.0069158 47.9989924,36.9954174 47.9843694,36.9836874 C47.2172927,36.368365 47.0942716,35.2477091 47.709594,34.4806324 L47.709594,34.4806324 L54.9234692,25.4876308 Z M32.75,19.0671243 C33.8545695,19.0671243 34.75,19.9625548 34.75,21.0671243 L34.75,31.5099988 L42.023526,38.5986848 C42.8010573,39.3832349 42.7953674,40.649552 42.0108173,41.4270833 C41.2262672,42.2046146 39.95995,42.1989248 39.1824187,41.4143747 L30.75,33.1563346 L30.75,21.0671243 C30.75,19.9625548 31.6454305,19.0671243 32.75,19.0671243 Z M32.6657924,7 C41.0531214,7 48.4627274,11.1861297 52.9192808,17.5830594 L52.8766168,17.6087953 C53.3731464,18.4866648 53.1951295,19.6181454 52.4043333,20.2972075 C52.3743465,20.3229574 52.3435952,20.3478036 52.3121209,20.3717126 C51.4414229,21.0331254 50.1994016,20.8634662 49.5379888,19.9927681 L49.5379888,19.9927681 L48.6657924,18.8445899 L48.7592176,18.7529787 C44.979383,14.1531765 39.24635,11.2192982 32.8280731,11.2192982 C21.6408183,11.2192982 12.5354421,20.1328798 12.2265245,31.2454628 L14.3474063,28.4089667 C14.9591197,27.5908638 16.1129804,27.4126176 16.9430459,28.0079973 C17.7488329,28.5859628 17.9335187,29.7077158 17.3555532,30.5135028 C17.3471997,30.5251491 17.3387071,30.5366949 17.3300771,30.5481377 L10.630094,39.4319847 L2.51571257,31.242303 C1.82357962,30.5437472 1.8287864,29.4163711 2.52734224,28.7242382 C2.54065899,28.7110439 2.55418327,28.6980607 2.56791004,28.6852935 C3.31776476,27.9878577 4.48595437,28.0119691 5.20639262,28.7397517 L8,31.561 L8.00243033,31.2587582 C8.22025649,17.8238743 19.1789988,7 32.6657924,7 Z M56.7545432,26.3341492 C56.7387784,26.2626125 56.7227031,26.1911924 56.7063188,26.1198902 Z"
                                    id="Recent-112"
                                  ></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                        <span>São Paulo</span>
                      </li>
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 64 64"
                          version="1.1"
                          className="injected-svg"
                          data-src="/images/recent.svg"
                          role="img"
                        >
                          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g transform="translate(-668.000000, -4508.000000)" fill="currentColor">
                              <g transform="translate(668.000000, 4508.000000)">
                                <g>
                                  <path
                                    d="M54.9234692,25.4876308 L62.515364,33.6224722 C62.5251428,33.6329503 62.5347957,33.6435451 62.5443208,33.6542544 C63.2033478,34.3952133 63.1369289,35.5301262 62.3959699,36.1891532 C61.6326858,36.8680368 60.4665142,36.8113784 59.7726368,36.0616986 L59.7726368,36.0616986 L57.2750658,33.3626788 C56.4036914,46.1946037 45.7187555,56.3333333 32.6657924,56.3333333 C25.4344392,56.3333333 18.9298738,53.221585 14.4180774,48.2640696 L14.3945183,48.2877713 L13.6966084,47.6204018 C13.6705567,47.5954902 13.6451885,47.5698735 13.6205319,47.5435803 C12.8706968,46.7439711 12.9110465,45.4878984 13.7106556,44.7380632 C14.5572568,43.9441611 15.8854977,43.9808935 16.6869279,44.8203717 L16.6869279,44.8203717 L16.905,45.049 L16.9779938,45.0029517 C20.7584678,49.5463639 26.4555119,52.4385965 32.8280731,52.4385965 C43.7268622,52.4385965 52.649752,43.9787655 53.3882946,33.2675511 L50.6471221,36.6882218 C50.0067045,37.4873238 48.8474346,37.6334122 48.0287858,37.0181782 C48.0137997,37.0069158 47.9989924,36.9954174 47.9843694,36.9836874 C47.2172927,36.368365 47.0942716,35.2477091 47.709594,34.4806324 L47.709594,34.4806324 L54.9234692,25.4876308 Z M32.75,19.0671243 C33.8545695,19.0671243 34.75,19.9625548 34.75,21.0671243 L34.75,31.5099988 L42.023526,38.5986848 C42.8010573,39.3832349 42.7953674,40.649552 42.0108173,41.4270833 C41.2262672,42.2046146 39.95995,42.1989248 39.1824187,41.4143747 L30.75,33.1563346 L30.75,21.0671243 C30.75,19.9625548 31.6454305,19.0671243 32.75,19.0671243 Z M32.6657924,7 C41.0531214,7 48.4627274,11.1861297 52.9192808,17.5830594 L52.8766168,17.6087953 C53.3731464,18.4866648 53.1951295,19.6181454 52.4043333,20.2972075 C52.3743465,20.3229574 52.3435952,20.3478036 52.3121209,20.3717126 C51.4414229,21.0331254 50.1994016,20.8634662 49.5379888,19.9927681 L49.5379888,19.9927681 L48.6657924,18.8445899 L48.7592176,18.7529787 C44.979383,14.1531765 39.24635,11.2192982 32.8280731,11.2192982 C21.6408183,11.2192982 12.5354421,20.1328798 12.2265245,31.2454628 L14.3474063,28.4089667 C14.9591197,27.5908638 16.1129804,27.4126176 16.9430459,28.0079973 C17.7488329,28.5859628 17.9335187,29.7077158 17.3555532,30.5135028 C17.3471997,30.5251491 17.3387071,30.5366949 17.3300771,30.5481377 L10.630094,39.4319847 L2.51571257,31.242303 C1.82357962,30.5437472 1.8287864,29.4163711 2.52734224,28.7242382 C2.54065899,28.7110439 2.55418327,28.6980607 2.56791004,28.6852935 C3.31776476,27.9878577 4.48595437,28.0119691 5.20639262,28.7397517 L8,31.561 L8.00243033,31.2587582 C8.22025649,17.8238743 19.1789988,7 32.6657924,7 Z M56.7545432,26.3341492 C56.7387784,26.2626125 56.7227031,26.1911924 56.7063188,26.1198902 Z"
                                    id="Recent-112"
                                  ></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                        <span>Campo Grande</span>
                      </li>
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 64 64"
                          version="1.1"
                          className="injected-svg"
                          data-src="/images/recent.svg"
                          role="img"
                        >
                          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g transform="translate(-668.000000, -4508.000000)" fill="currentColor">
                              <g transform="translate(668.000000, 4508.000000)">
                                <g>
                                  <path
                                    d="M54.9234692,25.4876308 L62.515364,33.6224722 C62.5251428,33.6329503 62.5347957,33.6435451 62.5443208,33.6542544 C63.2033478,34.3952133 63.1369289,35.5301262 62.3959699,36.1891532 C61.6326858,36.8680368 60.4665142,36.8113784 59.7726368,36.0616986 L59.7726368,36.0616986 L57.2750658,33.3626788 C56.4036914,46.1946037 45.7187555,56.3333333 32.6657924,56.3333333 C25.4344392,56.3333333 18.9298738,53.221585 14.4180774,48.2640696 L14.3945183,48.2877713 L13.6966084,47.6204018 C13.6705567,47.5954902 13.6451885,47.5698735 13.6205319,47.5435803 C12.8706968,46.7439711 12.9110465,45.4878984 13.7106556,44.7380632 C14.5572568,43.9441611 15.8854977,43.9808935 16.6869279,44.8203717 L16.6869279,44.8203717 L16.905,45.049 L16.9779938,45.0029517 C20.7584678,49.5463639 26.4555119,52.4385965 32.8280731,52.4385965 C43.7268622,52.4385965 52.649752,43.9787655 53.3882946,33.2675511 L50.6471221,36.6882218 C50.0067045,37.4873238 48.8474346,37.6334122 48.0287858,37.0181782 C48.0137997,37.0069158 47.9989924,36.9954174 47.9843694,36.9836874 C47.2172927,36.368365 47.0942716,35.2477091 47.709594,34.4806324 L47.709594,34.4806324 L54.9234692,25.4876308 Z M32.75,19.0671243 C33.8545695,19.0671243 34.75,19.9625548 34.75,21.0671243 L34.75,31.5099988 L42.023526,38.5986848 C42.8010573,39.3832349 42.7953674,40.649552 42.0108173,41.4270833 C41.2262672,42.2046146 39.95995,42.1989248 39.1824187,41.4143747 L30.75,33.1563346 L30.75,21.0671243 C30.75,19.9625548 31.6454305,19.0671243 32.75,19.0671243 Z M32.6657924,7 C41.0531214,7 48.4627274,11.1861297 52.9192808,17.5830594 L52.8766168,17.6087953 C53.3731464,18.4866648 53.1951295,19.6181454 52.4043333,20.2972075 C52.3743465,20.3229574 52.3435952,20.3478036 52.3121209,20.3717126 C51.4414229,21.0331254 50.1994016,20.8634662 49.5379888,19.9927681 L49.5379888,19.9927681 L48.6657924,18.8445899 L48.7592176,18.7529787 C44.979383,14.1531765 39.24635,11.2192982 32.8280731,11.2192982 C21.6408183,11.2192982 12.5354421,20.1328798 12.2265245,31.2454628 L14.3474063,28.4089667 C14.9591197,27.5908638 16.1129804,27.4126176 16.9430459,28.0079973 C17.7488329,28.5859628 17.9335187,29.7077158 17.3555532,30.5135028 C17.3471997,30.5251491 17.3387071,30.5366949 17.3300771,30.5481377 L10.630094,39.4319847 L2.51571257,31.242303 C1.82357962,30.5437472 1.8287864,29.4163711 2.52734224,28.7242382 C2.54065899,28.7110439 2.55418327,28.6980607 2.56791004,28.6852935 C3.31776476,27.9878577 4.48595437,28.0119691 5.20639262,28.7397517 L8,31.561 L8.00243033,31.2587582 C8.22025649,17.8238743 19.1789988,7 32.6657924,7 Z M56.7545432,26.3341492 C56.7387784,26.2626125 56.7227031,26.1911924 56.7063188,26.1198902 Z"
                                    id="Recent-112"
                                  ></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                        <span>Macapá</span>
                      </li>
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 64 64"
                          version="1.1"
                          className="injected-svg"
                          data-src="/images/recent.svg"
                          role="img"
                        >
                          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g transform="translate(-668.000000, -4508.000000)" fill="currentColor">
                              <g transform="translate(668.000000, 4508.000000)">
                                <g>
                                  <path
                                    d="M54.9234692,25.4876308 L62.515364,33.6224722 C62.5251428,33.6329503 62.5347957,33.6435451 62.5443208,33.6542544 C63.2033478,34.3952133 63.1369289,35.5301262 62.3959699,36.1891532 C61.6326858,36.8680368 60.4665142,36.8113784 59.7726368,36.0616986 L59.7726368,36.0616986 L57.2750658,33.3626788 C56.4036914,46.1946037 45.7187555,56.3333333 32.6657924,56.3333333 C25.4344392,56.3333333 18.9298738,53.221585 14.4180774,48.2640696 L14.3945183,48.2877713 L13.6966084,47.6204018 C13.6705567,47.5954902 13.6451885,47.5698735 13.6205319,47.5435803 C12.8706968,46.7439711 12.9110465,45.4878984 13.7106556,44.7380632 C14.5572568,43.9441611 15.8854977,43.9808935 16.6869279,44.8203717 L16.6869279,44.8203717 L16.905,45.049 L16.9779938,45.0029517 C20.7584678,49.5463639 26.4555119,52.4385965 32.8280731,52.4385965 C43.7268622,52.4385965 52.649752,43.9787655 53.3882946,33.2675511 L50.6471221,36.6882218 C50.0067045,37.4873238 48.8474346,37.6334122 48.0287858,37.0181782 C48.0137997,37.0069158 47.9989924,36.9954174 47.9843694,36.9836874 C47.2172927,36.368365 47.0942716,35.2477091 47.709594,34.4806324 L47.709594,34.4806324 L54.9234692,25.4876308 Z M32.75,19.0671243 C33.8545695,19.0671243 34.75,19.9625548 34.75,21.0671243 L34.75,31.5099988 L42.023526,38.5986848 C42.8010573,39.3832349 42.7953674,40.649552 42.0108173,41.4270833 C41.2262672,42.2046146 39.95995,42.1989248 39.1824187,41.4143747 L30.75,33.1563346 L30.75,21.0671243 C30.75,19.9625548 31.6454305,19.0671243 32.75,19.0671243 Z M32.6657924,7 C41.0531214,7 48.4627274,11.1861297 52.9192808,17.5830594 L52.8766168,17.6087953 C53.3731464,18.4866648 53.1951295,19.6181454 52.4043333,20.2972075 C52.3743465,20.3229574 52.3435952,20.3478036 52.3121209,20.3717126 C51.4414229,21.0331254 50.1994016,20.8634662 49.5379888,19.9927681 L49.5379888,19.9927681 L48.6657924,18.8445899 L48.7592176,18.7529787 C44.979383,14.1531765 39.24635,11.2192982 32.8280731,11.2192982 C21.6408183,11.2192982 12.5354421,20.1328798 12.2265245,31.2454628 L14.3474063,28.4089667 C14.9591197,27.5908638 16.1129804,27.4126176 16.9430459,28.0079973 C17.7488329,28.5859628 17.9335187,29.7077158 17.3555532,30.5135028 C17.3471997,30.5251491 17.3387071,30.5366949 17.3300771,30.5481377 L10.630094,39.4319847 L2.51571257,31.242303 C1.82357962,30.5437472 1.8287864,29.4163711 2.52734224,28.7242382 C2.54065899,28.7110439 2.55418327,28.6980607 2.56791004,28.6852935 C3.31776476,27.9878577 4.48595437,28.0119691 5.20639262,28.7397517 L8,31.561 L8.00243033,31.2587582 C8.22025649,17.8238743 19.1789988,7 32.6657924,7 Z M56.7545432,26.3341492 C56.7387784,26.2626125 56.7227031,26.1911924 56.7063188,26.1198902 Z"
                                    id="Recent-112"
                                  ></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                        <span>SINOP</span>
                      </li>
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 64 64"
                          version="1.1"
                          className="injected-svg"
                          data-src="/images/recent.svg"
                          role="img"
                        >
                          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g transform="translate(-668.000000, -4508.000000)" fill="currentColor">
                              <g transform="translate(668.000000, 4508.000000)">
                                <g>
                                  <path
                                    d="M54.9234692,25.4876308 L62.515364,33.6224722 C62.5251428,33.6329503 62.5347957,33.6435451 62.5443208,33.6542544 C63.2033478,34.3952133 63.1369289,35.5301262 62.3959699,36.1891532 C61.6326858,36.8680368 60.4665142,36.8113784 59.7726368,36.0616986 L59.7726368,36.0616986 L57.2750658,33.3626788 C56.4036914,46.1946037 45.7187555,56.3333333 32.6657924,56.3333333 C25.4344392,56.3333333 18.9298738,53.221585 14.4180774,48.2640696 L14.3945183,48.2877713 L13.6966084,47.6204018 C13.6705567,47.5954902 13.6451885,47.5698735 13.6205319,47.5435803 C12.8706968,46.7439711 12.9110465,45.4878984 13.7106556,44.7380632 C14.5572568,43.9441611 15.8854977,43.9808935 16.6869279,44.8203717 L16.6869279,44.8203717 L16.905,45.049 L16.9779938,45.0029517 C20.7584678,49.5463639 26.4555119,52.4385965 32.8280731,52.4385965 C43.7268622,52.4385965 52.649752,43.9787655 53.3882946,33.2675511 L50.6471221,36.6882218 C50.0067045,37.4873238 48.8474346,37.6334122 48.0287858,37.0181782 C48.0137997,37.0069158 47.9989924,36.9954174 47.9843694,36.9836874 C47.2172927,36.368365 47.0942716,35.2477091 47.709594,34.4806324 L47.709594,34.4806324 L54.9234692,25.4876308 Z M32.75,19.0671243 C33.8545695,19.0671243 34.75,19.9625548 34.75,21.0671243 L34.75,31.5099988 L42.023526,38.5986848 C42.8010573,39.3832349 42.7953674,40.649552 42.0108173,41.4270833 C41.2262672,42.2046146 39.95995,42.1989248 39.1824187,41.4143747 L30.75,33.1563346 L30.75,21.0671243 C30.75,19.9625548 31.6454305,19.0671243 32.75,19.0671243 Z M32.6657924,7 C41.0531214,7 48.4627274,11.1861297 52.9192808,17.5830594 L52.8766168,17.6087953 C53.3731464,18.4866648 53.1951295,19.6181454 52.4043333,20.2972075 C52.3743465,20.3229574 52.3435952,20.3478036 52.3121209,20.3717126 C51.4414229,21.0331254 50.1994016,20.8634662 49.5379888,19.9927681 L49.5379888,19.9927681 L48.6657924,18.8445899 L48.7592176,18.7529787 C44.979383,14.1531765 39.24635,11.2192982 32.8280731,11.2192982 C21.6408183,11.2192982 12.5354421,20.1328798 12.2265245,31.2454628 L14.3474063,28.4089667 C14.9591197,27.5908638 16.1129804,27.4126176 16.9430459,28.0079973 C17.7488329,28.5859628 17.9335187,29.7077158 17.3555532,30.5135028 C17.3471997,30.5251491 17.3387071,30.5366949 17.3300771,30.5481377 L10.630094,39.4319847 L2.51571257,31.242303 C1.82357962,30.5437472 1.8287864,29.4163711 2.52734224,28.7242382 C2.54065899,28.7110439 2.55418327,28.6980607 2.56791004,28.6852935 C3.31776476,27.9878577 4.48595437,28.0119691 5.20639262,28.7397517 L8,31.561 L8.00243033,31.2587582 C8.22025649,17.8238743 19.1789988,7 32.6657924,7 Z M56.7545432,26.3341492 C56.7387784,26.2626125 56.7227031,26.1911924 56.7063188,26.1198902 Z"
                                    id="Recent-112"
                                  ></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                        <span>Aparecida de Goiânia</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <span className="icon-arrow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-caret-up-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                  </svg>
                </span>
              </div>
            </div>
          )}
          <div className="search-and-login">
            <button onClick={() => switchBool("search")} ref={refSearch} className="header-buttons">
              <div className="icons-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </div>
            </button>
            {searcheBool && (
              <div className="container-dropdown" style={{ left: left }}>
                <div className="dropdown">
                  <div className="container-search">
                    <h3>O que você procura?</h3>
                    <div className="search-input">
                      <input type="text" placeholder="O que você procura?" name="search" />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-search"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                      </svg>
                    </div>
                  </div>
                  <span className="icon-arrow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-caret-up-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                    </svg>
                  </span>
                </div>
              </div>
            )}
            <div className="wrapper-login">
              <button onClick={() => switchBool("login")} ref={refLogin} className="header-buttons">
                <div className="login">
                  <div className="icons-wrapper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-person-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path
                        fillRule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                      />
                    </svg>
                  </div>
                  <p>Entre ou Cadastra-se</p>
                </div>
              </button>
              {loginBool && (
                <div className="container-dropdown" style={{ left: left }}>
                  <div className="dropdown">
                    <div className="container-login-or-create">
                      <div className="create-account">
                        <h3>Ainda não é cliente Ingresso.com?</h3>
                        <p>
                          Compre ingressos e combos de pipoca para ir ao cinema com segurança e mais
                          comodidade!
                        </p>
                        <ButtonStyle
                          url="/minha-conta/cadastro"
                          text="Criar uma nova conta"
                          style_width={true}
                          medio={true}
                        />
                      </div>
                      <div className="login-account">
                        <h3>Cliente Ingresso.com</h3>
                        <a href="/minha-conta">Entrar na minha Conta</a>
                      </div>
                    </div>
                    <span className="icon-arrow">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        className="bi bi-caret-up-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                      </svg>
                    </span>
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => switchBool("help")} ref={refHelp} className="header-buttons">
              <div className="icons-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-question-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
                </svg>
              </div>
            </button>
            {helpBool && (
              <div className="container-dropdown" style={{ left: left }}>
                <div className="dropdown wrapper-help">
                  <div className="container-help">
                    <h3>Quer cancelar um pedido?</h3>
                    <p>Você mesmo pode cancelar seu pedido, sem contactar um atendente. É rápido e fácil!</p>
                    <div className="help-buttons">
                      <ButtonStyle text="Sim, quero cancelar um pedido" small={true} />
                      <button className="button-help">Não, quero outro tipo de atendimento</button>
                    </div>
                  </div>
                  <span className="icon-arrow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-caret-up-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                    </svg>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="secondary-header">
        <nav>
          <ul>
            <li>
              <NavLink to="/filmes" className={({ isActive }) => (isActive ? "active-link" : "")}>
                FILMES
              </NavLink>
            </li>
            <li>
              <NavLink to="/cinemas" className={({ isActive }) => (isActive ? "active-link" : "")}>
                CINEMAS
              </NavLink>
            </li>
            <li>
              <NavLink to="/teatros" className={({ isActive }) => (isActive ? "active-link" : "")}>
                TEATRO
              </NavLink>
            </li>
            <li>
              <NavLink to="/eventos" className={({ isActive }) => (isActive ? "active-link" : "")}>
                EVENTOS
              </NavLink>
            </li>
            <li>
              <NavLink to="/noticias" className={({ isActive }) => (isActive ? "active-link" : "")}>
                NOTÍCIAS
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
