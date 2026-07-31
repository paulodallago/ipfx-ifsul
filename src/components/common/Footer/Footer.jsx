import React from "react";
import logo_if from "../../../assets/img/logo_pf.png";
import logo_cc from "../../../assets/img/logo_cc.jpeg";
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
                <a
                  href="https://inf.passofundo.ifsul.edu.br/src/home/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo_cc} alt="Logo CC" />
                </a>
              </div>
            </div>

            <hr className={styles.footerDivider} />

            <div className={styles.footerSection}>
              <h2>Apoio</h2>
              <div className={styles.supportLogos}>
                <a
                  href="https://www.instagram.com/offclubpf/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo_cc} alt="OffClub Logo" />
                </a>
                <a
                  href="https://www.instagram.com/terabyteshop/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo_cc} alt="Terabyte Logo" />
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
