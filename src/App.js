import { PrimeReactProvider } from "primereact/api";
// @ts-ignore
import "primereact/resources/themes/lara-light-indigo/theme.css";
// @ts-ignore
import "primereact/resources/primereact.min.css";
// @ts-ignore
import "primeicons/primeicons.css";
import React, { useEffect } from "react";
import Home from "./views/Home/Home";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer.tsx";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Gallery from "./views/Gallery/Gallery.tsx";
import About from "./views/About/About.tsx";
import Events from "./views/Events/Events";
import Links from "./views/Links/Links.tsx";
import News from "./views/News/News.tsx";
import NotFound from "./views/NotFound/NotFound";
import Admin from "./views/Admin/Admin";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname]);

  return null;
};

function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/galeria" element={<Gallery />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/timeline" element={<Events />} />
        <Route path="/links" element={<Links />} />
        <Route path="/noticias" element={<News />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!(useLocation().pathname === "/admin") && <Footer />}
    </>
  );
}

const App = () => {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </PrimeReactProvider>
  );
};

export default App;
