import React, { useEffect, useState } from "react";
import styles from "./About.module.css";
import { formatText } from "../../utils.js";
import { Sobre } from "../../types.ts";
import { getSobre } from "../../services/services.js";

const About = () => {
  const [data, setData] = useState<Sobre>();

  useEffect(() => {
    (async () => {
      setData(await getSobre());
    })();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>{data?.titulo}</h1>
        <div className={styles.text}>
          {formatText(data?.texto)}
          <p className={styles.center}>{data?.rodape}</p>
        </div>
      </div>
    </div>
  );
};

export default About;
