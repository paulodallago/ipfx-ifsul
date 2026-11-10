import pocketbase from "../../../services/pocketbase.js";
import styles from "./Hero.module.css";
import React, { useEffect, useState } from "react";
import { Texto } from "../../../services/types.ts";
import parse from "html-react-parser";

const Hero = () => {
  const [data, setData] = useState<Texto>();

  useEffect(() => {
    (async () => {
      setData(
        await pocketbase
          .collection("textos")
          .getFirstListItem("identificador='inicio'"),
      );
    })();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.filter}>
          <div className={styles.text}>
            <h1 className={styles.title}>{data?.titulo}</h1>
            <div className={styles.description}>
              {data ? parse(data.texto) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
