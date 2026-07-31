import React, { useState } from "react";
import { Menubar } from "primereact/menubar";
import { ReactComponent as Logo } from "../../../assets/img/logo.svg";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const items = [
    {
      label: "Início",
      icon: "pi pi-home",
      command: () => navigate("/"),
    },
    {
      label: "Galeria",
      icon: "pi pi-images",
      command: () => navigate("/galeria"),
    },
    {
      label: "Linha do tempo",
      icon: "pi pi-arrows-h",
      command: () => navigate("/timeline"),
    },
    {
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

  const end = (
    <>
      <div className={styles.menuRight}>
        {items.map((item, i) => (
          <a key={i} onClick={() => item.command()} className={styles.menuLink}>
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </a>
        ))}
      </div>

      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <i className="pi pi-bars"></i>
      </button>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {items.map((item, i) => (
            <a
              key={i}
              className={styles.mobileLink}
              onClick={() => {
                setMenuOpen(false);
                item.command();
              }}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      )}
    </>
  );

  return <Menubar start={start} end={end} className={styles.menuBar} />;
};

export default Header;
