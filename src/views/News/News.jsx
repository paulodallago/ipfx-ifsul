// @ts-nocheck
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import newsContent from "../../assets/json/newsContent";
import styles from "./News.module.css";

const News = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const open = (item) => {
    setSelected(item);
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
    setSelected(null);
  };

  const handleKey = (e, item) => {
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
          {newsContent.map((item) => (
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
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.mediaImg}
                />
              </div>
              <div className={styles.body}>
                <h3 className={styles.title}>{item.title}</h3>
                <div className={styles.date}>{item.date}</div>
                <p className={styles.summary}>{item.summary}</p>
              </div>
            </article>
          ))}
        </div>

        <Dialog
          header={selected?.title}
          visible={visible}
          className={styles.dialog}
          onHide={close}
          draggable={false}
          resizable={false}
        >
          {selected && (
            <div className={styles.dialogContent}>
              <img
                src={selected.image}
                alt={selected.title}
                className={styles.dialogImage}
              />
              <p className={styles.dialogDate}>{selected.date}</p>
              <p className={styles.dialogText}>{selected.content}</p>
            </div>
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default News;
