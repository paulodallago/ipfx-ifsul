import styles from "./Hero.module.css";
import React from "react";

const Hero = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.text}>
          <h1 className={styles.title}>
            Clube de Xadrez do Instituto Federal de Passo Fundo
          </h1>
          <p className={styles.description}>
            Espaço de prática e estudo de xadrez. Encontros abertos à
            comunidade! <br /> Venha fazer parte!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
