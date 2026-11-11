import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <section className={styles.content} aria-labelledby="not-found-title">
        <div className={styles.copy}>
          <span className={styles.eyebrow}>Parece que saímos da rota</span>
          <p className={styles.code}>404</p>
          <h1 id="not-found-title">Ops! Conteúdo não encontrado.</h1>
          <p className={styles.description}>
            A página que você procura pode ter mudado de endereço ou não existe
            mais. Que tal voltar para o início e continuar por lá?
          </p>
          <div className={styles.actions}>
            <Link to="/home" className={styles.homeButton}>
              <i className="pi pi-home" aria-hidden="true" />
              Voltar ao início
            </Link>
            <button
              type="button"
              className={styles.backButton}
              onClick={() => navigate(-1)}
            >
              <i className="pi pi-arrow-left" aria-hidden="true" />
              Página anterior
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
