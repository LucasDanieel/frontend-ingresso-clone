import { BrowserRouter, matchPath, Route, Routes, useLocation } from "react-router-dom";
import { PropsWithChildren, useEffect } from "react";

import Home from "../pages/home";
import Login from "../pages/login";
import Create from "../pages/create";
import Footer from "../components/footer";
import Header from "../components/header";
import Films from "../pages/films";
import Cinemas from "../pages/cinemas";
import Theaters from "../pages/theaters";
import News from "../pages/news";
import Events from "../pages/events";
import Film from "../pages/film";
import Profile from "../pages/profile";
import MyOrders from "../pages/my-orders";
import WrapperProfile from "../components/components-profile/wrapper-profile";
import MyOrdersEvents from "../pages/my-orders-events";
import UserProvider from "../providers/user-provider";
import Error from "../pages/error";

const routes = [
  {
    path: "/",
    element: <Home />,
    showHeaderFooter: true,
  },
  {
    path: "/filmes",
    element: <Films />,
    showHeaderFooter: true,
  },
  {
    path: "/filme/:slug",
    element: <Film />,
    showHeaderFooter: true,
  },
  {
    path: "/cinemas",
    element: <Cinemas />,
    showHeaderFooter: true,
  },
  {
    path: "/teatros",
    element: <Theaters />,
    showHeaderFooter: true,
  },
  {
    path: "/eventos",
    element: <Events />,
    showHeaderFooter: true,
  },
  {
    path: "/noticias",
    element: <News />,
    showHeaderFooter: true,
  },
  {
    path: "/minha-conta",
    element: <Login />,
    showHeaderFooter: false,
  },
  {
    path: "/minha-conta/confirmacao-de-email/:token_confirmacao_email",
    element: <Login />,
    showHeaderFooter: false,
  },
  {
    path: "/minha-conta/cadastro",
    element: <Create />,
    showHeaderFooter: false,
  },
  {
    path: "/minha-conta/meus-pedidos",
    element: <MyOrders />,
    showHeaderFooter: false,
    componentProfile: true,
  },
  {
    path: "/minha-conta/meus-pedidos-eventos",
    element: <MyOrdersEvents />,
    showHeaderFooter: false,
    componentProfile: true,
  },
  {
    path: "/minha-conta/edicao-de-cadastro",
    element: <Profile />,
    showHeaderFooter: false,
    componentProfile: true,
  },
  {
    path: "*",
    element: <Error />,
    showHeaderFooter: true,
  },
];

const Layout = ({ children }: PropsWithChildren) => {
  const location = useLocation();

  const currentRoute = routes.find(
    (route) => route.path === location.pathname || route.path === "*" || matchPath(route.path, location.pathname)
  );

  const showHeaderAndFooter = currentRoute?.showHeaderFooter;
  const componentProfile = currentRoute?.componentProfile;

  if (componentProfile) {
    return <WrapperProfile>{children}</WrapperProfile>;
  }

  return (
    <>
      {showHeaderAndFooter && <Header />}
      {children}
      {showHeaderAndFooter && <Footer />}
    </>
  );
};

function Router() {
  let lastScroll: number = 0;

  useEffect(() => {
    window.addEventListener("scroll", activeScroll);

    return () => window.removeEventListener("scroll", activeScroll);
  }, []);

  const activeScroll = () => {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;
    if (currentScroll > lastScroll && window.scrollY > 150) {
      document.querySelector(".secondary-header")?.classList.add("hidden");
    } else {
      document.querySelector(".secondary-header")?.classList.remove("hidden");
    }
    lastScroll = currentScroll;
  };

  return (
    <UserProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            {routes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
          </Routes>
        </Layout>
      </BrowserRouter>
    </UserProvider>
  );
}

export default Router;
