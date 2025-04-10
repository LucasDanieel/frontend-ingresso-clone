import { useContext, useEffect, useRef, useState } from "react";
import "./styles.scss";

import NavHeader from "../nav-header";
import DropdownCity from "../dropdown-city";
import DropdownLoginCreate from "../dropdown-login-create";
import DropdownHelp from "../dropdown-help";
import { IconPointMap, IconSearch, IconHelp, IconArrowDownGradient, IconCloseX } from "../../../icons";
import { UserContextType } from "../../../@types/user";
import { UserContext } from "../../../providers/user-provider";
import DropdownMenuProfile from "../dropdown-menu-profile";

const Header = () => {
  const [cityBool, setCityBool] = useState<boolean>(false);
  const [loginBool, setLoginBool] = useState<boolean>(false);
  const [helpBool, setHelpBool] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [left, setLeft] = useState<number>(0);

  const refCity = useRef<HTMLButtonElement>(null);
  const refLogin = useRef<HTMLButtonElement>(null);
  const refHelp = useRef<HTMLButtonElement>(null);

  const { user, actualCity } = useContext(UserContext) as UserContextType;

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
      refLogin.current?.contains(e.target as Node) ||
      refHelp.current?.contains(e.target as Node) ||
      dropDown?.contains(e.target as Node)
    ) {
      return;
    }

    setCityBool(false);
    setLoginBool(false);
    setHelpBool(false);
  };

  const switchBool = (whitch: string) => {
    if (cityBool == true) setCityBool(false);
    if (loginBool == true) setLoginBool(false);
    if (helpBool == true) setHelpBool(false);

    switch (whitch) {
      case "city":
        cityBool == false ? setCityBool(true) : setCityBool(false);

        calc_position(document.querySelector(".city-header"));
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

          (html as HTMLElement).style.top = "72px";

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
          <a className="icon-ingresso" href="/">
            <div className="logo-header">
              <img
                src="https://ingresso-a.akamaihd.net/catalog/img/ingresso-logo-v1-desktop-final.svg"
                alt="INGRESSO"
                data-testid="logo-ingresso"
              />
            </div>
          </a>
          <button className="header-button-city" onClick={() => switchBool("city")} ref={refCity}>
            <div className="city-header" data-testid="div-city-header">
              <IconPointMap />
              <span>{actualCity?.name}</span>
              <IconArrowDownGradient />
            </div>
          </button>
          {cityBool && <DropdownCity left={left} setCityBool={setCityBool} />}
          <NavHeader />
          <div className="search-and-login">
            <div className="header-input-search" data-testid="div-header-input-search">
              <input type="text" name="search" value={search} onChange={(e) => setSearch(e.target.value)} />
              <IconSearch />
              {search && <IconCloseX setState={() => setSearch("")} />}
            </div>
            <div className="wrapper-login">
              {user ? (
                <>
                  <button
                    className="header-button-user-profile"
                    onClick={() => switchBool("login")}
                    ref={refLogin}
                    data-testid="button-menu-profile"
                  >
                    <div className="user-profile-first-letter">{user.name[0]}</div>
                    <div className="user-profile-menu">
                      <p>Olá, {user.name.split(" ")[0]}</p>
                      <span>Meus Pedidos</span>
                    </div>
                  </button>
                  {loginBool && <DropdownMenuProfile left={left} user={user} />}
                </>
              ) : (
                <>
                  <button
                    className="header-button-login"
                    onClick={() => switchBool("login")}
                    ref={refLogin}
                    data-testid="button-login"
                  >
                    Entrar
                  </button>
                  {loginBool && <DropdownLoginCreate left={left} />}
                </>
              )}
            </div>
            <button className="header-button-help" onClick={() => switchBool("help")} ref={refHelp}>
              <div className="icons-wrapper">
                <IconHelp />
              </div>
            </button>
            {helpBool && <DropdownHelp left={left} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
