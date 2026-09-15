// @ts-nocheck
import React from "react";
import styles from "./Links.module.css";
import logo_fgx from "../../assets/img/fgx.jpg";
import logo_cbx from "../../assets/img/cbx.png";
import logo_calendario from "../../assets/img/calendario.png";
import logo_fide from "../../assets/img/fide.jpg";

const Links = () => {
  const items = [
    {
      name: "Confederação Brasileira de Xadrez",
      img: logo_cbx,
      link: "https://www.cbx.org.br/",
    },
    {
      name: "Federação Gaúcha de Xadrez",
      img: logo_fgx,
      link: "https://www.instagram.com/federacao.gaucha.xadrez/",
    },
    {
      name: "Calendário de torneios de xadrez no RS",
      img: logo_calendario,
      link: "https://xadrez-rs.com.br/calendario.php",
    },
    {
      name: "Federação Internacional de Xadrez",
      img: logo_fide,
      link: "https://www.fide.com/",
    },
  ];

  const handleKey = (e, link) => {
    if (e.key === "Enter" || e.key === " ") {
      window.open(link, "_blank");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Links úteis</h1>
          <p>Abra os sites relacionados ao xadrez e ao projeto.</p>
        </div>

        <div className={styles.grid}>
          {items.map((item, idx) => (
            <div
              key={idx}
              role="button"
              tabIndex={0}
              className={styles.card}
              onClick={() => window.open(item.link, "_blank")}
              onKeyDown={(e) => handleKey(e, item.link)}
            >
              <div className={styles.icon}>
                <img src={item.img} alt={item.name} />
              </div>
              <div className={styles.label}>{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Links;
