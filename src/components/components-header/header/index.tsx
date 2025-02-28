import { useEffect, useRef, useState } from "react";
import "./styles.scss";

import NavHeader from "../nav-header";
import DropdownCity from "../dropdown-city";
import DropdownSearch from "../dropdown-search";
import DropdownLoginCreate from "../dropdown-login-create";
import DropdownHelp from "../dropdown-help";

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

        calc_position(document.querySelector(".city-header"));
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

  const calc_position = (component_ref: Element | null) => {
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

          const new_rect = html.getBoundingClientRect();
          (icon as HTMLElement).style.left = `${result - new_rect.left - 12}px`;
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
          <button className="header-buttons" onClick={() => switchBool("city")} ref={refCity}>
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
          {cityBool && <DropdownCity left={left} />}
          <div className="search-and-login">
            <button className="header-buttons" onClick={() => switchBool("search")} ref={refSearch}>
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
            {searcheBool && <DropdownSearch left={left} />}
            <div className="wrapper-login">
              <button className="header-buttons" onClick={() => switchBool("login")} ref={refLogin}>
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
              {loginBool && <DropdownLoginCreate left={left} />}
            </div>
            <button className="header-buttons" onClick={() => switchBool("help")} ref={refHelp}>
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
            {helpBool && <DropdownHelp left={left} />}
          </div>
        </div>
      </div>
      <NavHeader />
    </header>
  );
};

export default Header;
