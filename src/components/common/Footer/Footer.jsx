import React from "react";
import logo_if from "../../../assets/img/logo_pf.png";
import logo_cc from "../../../assets/img/logo_cc.png";
import logo_oscip from "../../../assets/img/oscip.png";
import logo_sollar from "../../../assets/img/sollar.png";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerSupport}>
            <div className={styles.footerSection}>
              <h2>Realização</h2>
              <div className={styles.supportLogos}>
                <a
                  href="https://passofundo.ifsul.edu.br"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo_if} alt="Logo IFSul" />
                </a>
              </div>
            </div>

            <div className={styles.footerDivider}></div>

            <div className={styles.footerSection}>
              <h2>Apoio</h2>
              <div className={styles.supportLogos}>
                <a
                  href="https://www.instagram.com/inovadores.xadrez/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo_oscip} alt="Logo OSCIP Inovadores Xadrez" />
                </a>
                <a
                  href="https://www.instagram.com/sollardigitalpf/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo_sollar} alt="Logo Sollardigital" />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.footerContent}>
            <p className={styles.footerCopyright}>
              <span>© 2026 - IFSul - Câmpus Passo Fundo: </span>
              <a
                href="https://passofundo.ifsul.edu.br"
                target="_blank"
                rel="noopener noreferrer"
              >
                passofundo.ifsul.edu.br
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
