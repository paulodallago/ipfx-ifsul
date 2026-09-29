// @ts-nocheck
import React, { useState } from "react";
import styles from "./EditionCard.module.css";

const ModalityItem = ({ name, podium }) => {
  const hasTeam = podium[0]?.player?.trim(); //??

  if (!hasTeam) {
    return (
      <li className={styles.championItem}>
        <span className={styles.modality}>{podium[0].modality}</span>
        <span className={styles.teamUnavailable}>Dados não registrados</span>
      </li>
    );
  }

  return (
    <li key={name}>
      <h4>Categoria: {name}</h4>
      {podium.map((player, index) => (
        <div
          className={styles.championItem}
          style={{
            borderLeft:
              index === 0
                ? "3px solid var(--gold)"
                : index === 1
                  ? "3px solid var(--silver)"
                  : "3px solid var(--bronze)",
          }}
          key={index}
        >
          <span className={styles.modality}>{player.position}</span>
          <span className={styles.team}>{player.player}</span>
        </div>
      ))}
    </li>
  );
};

const EditionCard = ({ edition, onOpenGallery }) => {
  const gallery = [edition.cover, ...(edition.gallery ?? [])];
  const photoCount = new Set(gallery).size;
  const [expanded, setExpanded] = useState(false);

  const visibleModalities = edition.modalities
    ? expanded
      ? edition.modalities
      : edition.modalities.slice(0, 1)
    : null;

  return (
    <div className={`${styles.card} defaultLift`}>
      <header className={styles.cardHeader}>
        <div>
          <span className={styles.editionTag}>Edição {edition.edition}</span>

          <h3 className={styles.cardTitle}>{edition.name}</h3>

          <span className={styles.cardDate}>
            <i className="pi pi-calendar" />
            {edition.date}
          </span>
        </div>

        <div className={styles.participantsBadge}>
          <span className={styles.participantsNumber}>
            {edition.participants}
          </span>

          <span className={styles.participantsLabel}>participantes</span>
        </div>
      </header>

      <section>
        <button
          type="button"
          className={styles.coverBtn}
          onClick={() => onOpenGallery(edition, 0)}
          aria-label={`Abrir galeria de ${edition.name}`}
        >
          <img
            src={edition.cover}
            alt={`${edition.name} - destaque`}
            className={styles.cover}
          />

          <span className={styles.coverOverlay}>
            <i className="pi pi-images" />
            <span>Ver {photoCount} fotos</span>
          </span>
        </button>
      </section>

      {visibleModalities ? (
        <section className={styles.championsBlock}>
          <h4 className={styles.championsTitle}>
            <i className="pi pi-trophy" />
            Campeões
          </h4>

          <ul className={styles.championsList}>
            {visibleModalities.map((modality) => (
              <ModalityItem
                key={modality.name}
                name={modality.name}
                podium={modality.podium}
              />
            ))}

            <button
              type="button"
              className={styles.seeMoreButton}
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? "Ver menos" : "Ver mais"}
            </button>
          </ul>
        </section>
      ) : null}
    </div>
  );
};

export default EditionCard;
