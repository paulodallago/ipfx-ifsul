import React from "react";
import logo from "../../../assets/img/logo_cc.png";
import styles from "./Contact.module.css";

const Contact = () => {
  const items = [
    {
      icon: "pi pi-instagram",
      text: "@arenagamesifsul",
      link: "https://www.instagram.com/arenagamesifsul/",
    },
    {
      icon: "pi pi-envelope",
      text: "pf-arenagames@ifsul.edu.br",
      link: "mailto:pf-arenagames@ifsul.edu.br",
    },
    {
      icon: "pi pi-map-marker",
      text: "Est. Perimetral Leste, 150. Passo Fundo - RS",
      link: "https://maps.app.goo.gl/MRCNfrXAJCsP1LvD9",
    },
    {
      icon: "pi pi-phone",
      text: "(54) 2024-0400",
      link: "tel:+555420240400",
    },
  ];

  return (
    <>
      <section className={styles.contact}>
        <div className={styles.container}>
          <div className={styles.contactContent}>
            <div className={styles.contactImage + " simpleHover"}>
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
                {items.map((item, index) => {
                  return (
                    <p>
                      <i
                        className={"pi " + item.icon + " defaultHover-2"}
                        onClick={() => window.open(item.link, "_blank")}
                      />
                      {item.text}
                    </p>
                  );
                })}
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
