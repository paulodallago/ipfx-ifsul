// @ts-nocheck
import React, { useEffect, useState } from "react";
import styles from "./About.module.css";
import axios from "axios";
import { baseUrl, FormatText } from "../../utils";

const About = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl + "sobre")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>{data.titulo}</h1>
        <div className={styles.text}>
          {FormatText(data.texto)}
          <p className={styles.center}>{data.rodape}</p>
        </div>
      </div>
    </div>
  );
};

export default About;
