import React, { useEffect, useState } from "react";
import styles from "./FaqPage.module.css";
import { Faq } from "../../services/types.ts";
import pocketbase from "../../services/pocketbase.js";

const FaqPage = () => {
  const [data, setData] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const records = await pocketbase.collection("faq").getFullList<Faq>();
        setData(records);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className="underline">Perguntas frequentes</h1>
          <p className={styles.subtitle}>
            Tire suas dúvidas sobre o projeto, encontros e competições.
          </p>
        </div>

        {loading ? (
          <div className={styles.empty}>
            <i className="pi pi-spin pi-spinner" aria-hidden="true" />
            <span>Carregando perguntas...</span>
          </div>
        ) : data.length === 0 ? (
          <div className={styles.empty}>
            <i className="pi pi-question-circle" aria-hidden="true" />
            <span>Nenhuma pergunta cadastrada no momento.</span>
          </div>
        ) : (
          <div className={styles.list}>
            {data.map((item) => {
              const isOpen = openId === item.id;
              const panelId = `faq-answer-${item.id}`;
              const buttonId = `faq-question-${item.id}`;

              return (
                <div
                  key={item.id}
                  className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
                >
                  <button
                    id={buttonId}
                    type="button"
                    className={styles.question}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                  >
                    <span>{item.pergunta}</span>
                    <i
                      className={`pi pi-chevron-down ${styles.chevron}`}
                      aria-hidden="true"
                    />
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={styles.answerWrapper}
                  >
                    <div className={styles.answerInner}>
                      <p className={styles.answer}>{item.resposta}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FaqPage;
