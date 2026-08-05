// @ts-nocheck
import React from "react";
import { Tooltip } from "primereact/tooltip";
import styles from "./EditionCard.module.css";

const ChampionItem = ({ champion, tooltipTargetClass }) => {
  const hasTeam = champion.team?.trim();
  const hasPlayersProp = Array.isArray(champion.players);
  const hasPlayers = hasPlayersProp && champion.players.length > 0;

  if (!hasTeam && !hasPlayers) {
    return (
      <li className={styles.championItem}>
        <span className={styles.modality}>{champion.modality}</span>
        <span className={styles.teamUnavailable}>Dados não registrados</span>
      </li>
    );
  }

  let tooltipContent = null;

  if (hasPlayersProp) {
    tooltipContent = hasPlayers
      ? champion.players.join("\n")
      : "Participantes em breve";
  }

  return (
    <li className={styles.championItem}>
      <span className={styles.modality}>{champion.modality}</span>

      <span
        className={`${styles.team} ${
          tooltipContent ? tooltipTargetClass : ""
        } ${!tooltipContent ? styles.teamPlain : ""}`}
        {...(tooltipContent && {
          "data-pr-tooltip": tooltipContent,
          "data-pr-position": "top",
          tabIndex: 0,
        })}
      >
        {champion.team}
      </span>
    </li>
  );
};

const EditionCard = ({ edition, delta, onOpenGallery }) => {
  const gallery = [edition.cover, ...(edition.gallery ?? [])];
  const photoCount = new Set(gallery).size;

  const tooltipTargetClass = `team-tooltip-${edition.edition}`;

  return (
    <div className={`${styles.card} defaultLift`}>
      <Tooltip
        target={`.${tooltipTargetClass}`}
        position="top"
        showDelay={150}
        hideDelay={100}
      />

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

          {delta != null && (
            <span className={styles.growth}>
              <i className="pi pi-arrow-up" />
              {delta}%
            </span>
          )}
        </div>
      </header>

      <section className={styles.gallery}>
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

        <div className={styles.thumbs}>
          {edition.gallery.slice(0, 3).map((src, index) => (
            <button
              key={src}
              type="button"
              className={styles.thumbBtn}
              onClick={() => onOpenGallery(edition, index + 1)}
              aria-label={`Abrir foto ${index + 1} de ${edition.name}`}
            >
              <img
                src={src}
                alt={`${edition.name} - foto ${index + 1}`}
                className={styles.thumb}
              />
            </button>
          ))}
        </div>
      </section>

      <section className={styles.championsBlock}>
        <h4 className={styles.championsTitle}>
          <i className="pi pi-trophy" />
          Campeões
        </h4>

        <ul className={styles.championsList}>
          {edition.champions.map((champion) => (
            <ChampionItem
              key={champion.modality}
              champion={champion}
              tooltipTargetClass={tooltipTargetClass}
            />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default EditionCard;
