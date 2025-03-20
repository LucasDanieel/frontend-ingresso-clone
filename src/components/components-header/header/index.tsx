import { useEffect, useRef, useState } from "react";
import "./styles.scss";

import NavHeader from "../nav-header";
import DropdownCity from "../dropdown-city";
import DropdownSearch from "../dropdown-search";
import DropdownLoginCreate from "../dropdown-login-create";
import DropdownHelp from "../dropdown-help";
import { IconPointMap, IconSearch, IconPersonCircle, IconHelp } from "../../../icons";

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
                data-testid="logo-ingresso"
              />
            </div>
          </a>
          <button className="header-buttons" onClick={() => switchBool("city")} ref={refCity}>
            <div className="city-header">
              <div className="icon-point">
                <IconPointMap />
              </div>
              <p>São Paulo</p>
            </div>
          </button>
          {cityBool && <DropdownCity left={left} />}
          <div className="search-and-login">
            <button className="header-buttons" onClick={() => switchBool("search")} ref={refSearch}>
              <div className="icons-wrapper">
                <IconSearch />
              </div>
            </button>
            {searcheBool && <DropdownSearch left={left} />}
            <div className="wrapper-login">
              <button className="header-buttons" onClick={() => switchBool("login")} ref={refLogin}>
                <div className="login">
                  <div className="icons-wrapper">
                    <IconPersonCircle />
                  </div>
                  <p>Entre ou Cadastra-se</p>
                </div>
              </button>
              {loginBool && <DropdownLoginCreate left={left} />}
            </div>
            <button className="header-buttons" onClick={() => switchBool("help")} ref={refHelp}>
              <div className="icons-wrapper">
                <IconHelp />
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
