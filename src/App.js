// @ts-nocheck
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import React from "react";
import Home from "./views/Home/Home";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Gallery from "./views/Gallery/Gallery";
import About from "./views/About/About";
import Contact from "./components/common/Contact/Contact";
import PastEditions from "./views/PastEditions/PastEditions";

const App = () => {
  return (
    <PrimeReactProvider>
      <BrowserRouter basename="/ipfx-ifsul/">
        <Header />
        <div style={{ paddingTop: "10vh" }}>
          <Routes>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Home />} />
            <Route path="/galeria" element={<Gallery />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/timeline" element={<PastEditions />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </PrimeReactProvider>
  );
};

export default App;
