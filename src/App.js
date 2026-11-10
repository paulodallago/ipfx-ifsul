// @ts-nocheck
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import React, { useEffect } from "react";
import Home from "./views/Home/Home";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer.tsx";
import {
  HashRouter,
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

const App = () => {
  return (
    <PrimeReactProvider>
      <HashRouter basename="/">
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Home />} />
          <Route path="/galeria" element={<Gallery />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/timeline" element={<Events />} />
          <Route path="/links" element={<Links />} />
          <Route path="/noticias" element={<News />} />
        </Routes>
        <Footer />
      </HashRouter>
    </PrimeReactProvider>
  );
};

export default App;
