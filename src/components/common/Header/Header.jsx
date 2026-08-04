import React from "react";
import { Menubar } from "primereact/menubar";
import { ReactComponent as Logo } from "../../../assets/img/logo.svg";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const items = [
    {
      key: "home",
      label: "Início",
      icon: "pi pi-home",
      command: () => navigate("/"),
    },
    {
      key: "gallery",
      label: "Galeria",
      icon: "pi pi-images",
      command: () => navigate("/galeria"),
    },
    {
      key: "timeline",
      label: "Linha do tempo",
      icon: "pi pi-arrows-h",
      command: () => navigate("/timeline"),
    },
    {
      key: "about",
      label: "Sobre nós",
      icon: "pi pi-info-circle",
      command: () => navigate("/sobre"),
    },
  ];

  const start = (
    <div className={styles.menuLeft}>
      <Logo className={styles.logo} />
    </div>
  );

  return <Menubar model={items} start={start} className={styles.menuBar} />;
};

export default Header;
