import styles from "./Card.module.css";
import React from "react";
import encontros from "../../../assets/img/encontros.jpeg";

const Card = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h1>Encontros semanais</h1>
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
      </div>
    </div>
  );
};

export default Card;
