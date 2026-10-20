import React from "react";
import { Menubar } from "primereact/menubar";
import { ReactComponent as Logo } from "../../../assets/img/logo.svg";
import styles from "./Header.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      key: "home",
      label: "Início",
      icon: "pi pi-home",
      path: "/",
      command: () => navigate("/"),
    },
    {
      key: "timeline",
      label: "Eventos realizados",
      icon: "pi pi-calendar",
      path: "/timeline",
      command: () => navigate("/timeline"),
    },
    {
      key: "links",
      label: "Links úteis",
      icon: "pi pi-link",
      path: "/links",
      command: () => navigate("/links"),
    },
    {
      key: "news",
      label: "Notícias",
      icon: "pi pi-bell",
      path: "/noticias",
      command: () => navigate("/noticias"),
    },
    {
      key: "gallery",
      label: "Galeria",
      icon: "pi pi-images",
      path: "/galeria",
      command: () => navigate("/galeria"),
    },
    {
      key: "about",
      label: "Sobre nós",
      icon: "pi pi-info-circle",
      path: "/sobre",
      command: () => navigate("/sobre"),
    },
  ].map((item) => {
    const isActive =
      item.path === "/"
        ? location.pathname === "/"
        : location.pathname === item.path;

    return {
      ...item,
      template: () => (
        <button
          type="button"
          className={`${styles.menuLink} ${isActive ? styles.activeMenuItem : ""}`}
          onClick={item.command}
        >
          <i className={item.icon} />
          <span>{item.label}</span>
        </button>
      ),
    };
  });

  const start = (
    <div className={styles.menuLeft}>
      <Logo
        className={styles.logo + " simpleHover"}
        onClick={() => navigate("/")}
      />
    </div>
  );

  return <Menubar model={items} start={start} className={styles.menuBar} />;
};

export default Header;
