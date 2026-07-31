import React, { useState } from "react";
import { Menubar } from "primereact/menubar";
import { ReactComponent as Logo } from "../../../assets/img/logo.svg";
import styles from "./Header.module.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const items = [
    {
      label: "Início",
      icon: "pi pi-home",
      url: "/ipfx-ifsul/inicio",
    },
    {
      label: "Galeria",
      icon: "pi pi-images",
      url: "/ipfx-ifsul/galeria",
    },
    {
      label: "Linha do tempo",
      icon: "pi pi-arrows-h",
      url: "/ipfx-ifsul/timeline",
    },
    {
      label: "Sobre nós",
      icon: "pi pi-info-circle",
      url: "/ipfx-ifsul/sobre",
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
          <a key={i} href={item.url} className={styles.menuLink}>
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
              href={item.url}
              className={styles.mobileLink}
              onClick={() => {
                setMenuOpen(false);
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
