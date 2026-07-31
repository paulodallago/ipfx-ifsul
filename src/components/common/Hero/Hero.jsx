import styles from "./Hero.module.css";
import React from "react";
import chess from "../../../assets/img/chess.png";

const Hero = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <img src={chess} alt="imagem ilustrativa" className={styles.mainImg} />
        <div className={styles.text}>
          <h1 className={styles.title}>Xadrez IFSul</h1>
          <p className={styles.description}>
            Bem-vindo ao site do Xadrez IFSul! Aqui você encontrará informações
            sobre o nosso clube de xadrez, incluindo notícias, eventos e
            recursos para jogadores de todos os níveis. Junte-se a nós e explore
            o mundo fascinante do xadrez!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
