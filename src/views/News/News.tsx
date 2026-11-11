import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import styles from "./News.module.css";
import { Noticia } from "../../services/types.js";
import { formatDate } from "../../utils.js";
import pocketbase from "../../services/pocketbase.js";
import parse from "html-react-parser";

const News = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<Noticia>();

  const [data, setData] = useState<Noticia[]>([]);

  useEffect(() => {
    (async () => {
      setData(
        await pocketbase.collection("noticias").getFullList({ sort: "-data" }),
      );
    })();
  }, []);

  const open = (item: Noticia) => {
    setSelected(item);
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
    setSelected(undefined);
  };

  const handleKey = (e: any, item: Noticia) => {
    if (e.key === "Enter" || e.key === " ") open(item);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Notícias</h1>
          <p>Fique por dentro das novidades do clube.</p>
        </div>

        <div className={styles.grid}>
          {data.map((item) => (
            <article
              key={item.id}
              role="button"
              tabIndex={0}
              className={styles.card + " defaultLift"}
              onClick={() => open(item)}
              onKeyDown={(e) => handleKey(e, item)}
            >
              <div className={styles.media}>
                <div
                  className={styles.mediaBg}
                  style={{
                    backgroundImage: `url(${pocketbase.files.getURL(item, item.imagem)})`,
                  }}
                />
                <img
                  src={pocketbase.files.getURL(item, item.imagem)}
                  alt={item?.titulo}
                  className={styles.mediaImg}
                />
              </div>
              <div className={styles.body}>
                <h3 className={styles.title}>{item?.titulo}</h3>
                <div className={styles.date}>{formatDate(item?.data)}</div>
                <p className={styles.summary}>{item?.sumario}</p>
              </div>
            </article>
          ))}
        </div>

        <Dialog
          header={selected?.titulo}
          visible={visible}
          className={styles.dialog}
          onHide={close}
          draggable={false}
          resizable={false}
        >
          {selected && (
            <div className={styles.dialogContent}>
              <div className={styles.media}>
                <div
                  className={styles.mediaBg}
                  style={{
                    backgroundImage: `url(${pocketbase.files.getURL(selected, selected.imagem)})`,
                  }}
                />
                <img
                  src={pocketbase.files.getURL(selected, selected.imagem)}
                  alt={selected.titulo}
                  className={styles.mediaImg}
                />
              </div>

              <p className={styles.dialogDate}>{formatDate(selected.data)}</p>
              <div className={styles.dialogText}>{parse(selected.texto)}</div>
            </div>
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default News;
