import React, { useEffect, useState } from "react";
import styles from "./Links.module.css";
import pocketbase from "../../services/pocketbase.js";
import { Link } from "../../services/types.ts";

const Links = () => {
  const [data, setData] = useState<Link[]>([]);

  useEffect(() => {
    (async () => {
      setData(
        await pocketbase.collection("links").getFullList({ sort: "nome" }),
      );
    })();
  }, []);

  const handleKey = (e: any, url: string) => {
    if (e.key === "Enter" || e.key === " ") {
      window.open(url, "_blank");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Links úteis</h1>
          <p>Abra os sites relacionados ao xadrez e ao projeto.</p>
        </div>

        <div className={styles.grid}>
          {data.map((item, idx) => (
            <div
              key={idx}
              role="button"
              tabIndex={0}
              className={styles.card}
              onClick={() => window.open(item.url, "_blank")}
              onKeyDown={(e) => handleKey(e, item.url)}
            >
              <div className={styles.icon}>
                <img
                  src={pocketbase.files.getURL(item, item.imagem)}
                  alt={item.nome}
                />
              </div>
              <div className={styles.label}>{item.nome}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Links;
