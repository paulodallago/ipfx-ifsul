import React from "react";
import logo from "../../../assets/img/logo_cc.jpeg";
import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <>
      <section className={styles.contact}>
        <div className={styles.container}>
          <div className={styles.contactContent}>
            <div className={styles.contactImage}>
              <img src={logo} alt="Entre em contato" />
            </div>

            <div className={styles.contactIntro}>
              <h2 className="underlineText">Tem interesse em apoiar?</h2>
              <p>
                Entre em contato conosco por meio de algum dos nossos meios de
                contato.
              </p>
            </div>

            <div className={styles.contactText}>
              <h2 className="underlineText">Fale Conosco</h2>

              <div className={styles.contactInfo}>
                <p>
                  <i
                    className="pi pi-map-marker defaultHover-2"
                    onClick={() =>
                      window.open(
                        "https://maps.app.goo.gl/MRCNfrXAJCsP1LvD9",
                        "_blank",
                      )
                    }
                  />
                  Est. Perimetral Leste, 150. Passo Fundo - RS
                </p>
                <p>
                  <i
                    className="pi pi-envelope defaultHover-2"
                    onClick={() =>
                      window.open(
                        "mailto:pf-arenagames@ifsul.edu.br",
                        "noopener",
                      )
                    }
                  />
                  pf-arenagames@ifsul.edu.br
                </p>
                <p>
                  <i className="pi pi-phone defaultHover-2" />
                  (54) 2024-0400
                </p>
                <p>
                  <i
                    className="pi pi-instagram defaultHover-2"
                    onClick={() =>
                      window.open(
                        "https://www.instagram.com/arenagamesifsul/",
                        "_blank",
                      )
                    }
                  />
                  @arenagamesifsul
                </p>
              </div>

              <div className={styles.footerSocial}>
                <a
                  href="https://www.instagram.com/arenagamesifsul/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                >
                  <i className="bi bi-instagram"></i>
                </a>

                <a
                  href="https://www.youtube.com/@ArenaGamesIFSULPF"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                >
                  <i className="bi bi-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
