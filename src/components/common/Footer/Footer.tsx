import React, { useEffect, useState } from "react";
import logo_if from "../../../assets/img/logo_pf.png";
import styles from "./Footer.module.css";
import { Apoiador } from "../../../services/types";
import pocketbase from "../../../services/pocketbase";

export default function Footer() {
  const [data, setData] = useState<Apoiador[]>([]);

  useEffect(() => {
    (async () => {
      setData(
        await pocketbase.collection("apoiadores").getFullList({ sort: "nome" }),
      );
    })();
  }, []);

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
                {data.map((item) => (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={item.id}
                  >
                    <img
                      src={pocketbase.files.getURL(item, item.logo)}
                      alt={item.alt}
                    />
                  </a>
                ))}
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
