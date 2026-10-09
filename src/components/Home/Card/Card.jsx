import styles from "./Card.module.css";
import React from "react";

const Card = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h1>Como participar?</h1>
        <p>
          O IFSUL Passo Fundo possui encontros semanais! <br />
          Venha jogar conosco, trocar ideias e fazer novas amizades a cada
          jogada. <br />
          {/* todo */}
        </p>
        <ul className={styles.list}>
          <li>Aberto a todos os estudantes e comunidade</li>
          <li>Todos os sábados as 15:00 </li>
        </ul>
        <p>
          Também fique de olho nas nossas redes sociais para ficar sabendo de
          todos os próximos eventos!
        </p>
      </div>
    </div>
  );
};

export default Card;
