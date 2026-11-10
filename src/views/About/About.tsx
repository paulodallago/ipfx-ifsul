import React, { useEffect, useState } from "react";
import styles from "./About.module.css";
import { Texto } from "../../services/types.ts";
import pocketbase from "../../services/pocketbase.js";
import parse from "html-react-parser";

const About = () => {
  const [data, setData] = useState<Texto>();

  useEffect(() => {
    (async () => {
      setData(
        await pocketbase
          .collection("textos")
          .getFirstListItem("identificador='sobre'"),
      );
    })();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>{data?.titulo}</h1>
        <div className={styles.text}>{data ? parse(data.texto) : null}</div>
      </div>
    </div>
  );
};

export default About;
