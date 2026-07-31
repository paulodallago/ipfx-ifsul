// @ts-nocheck
import React from "react";
import { Tooltip } from "primereact/tooltip";
import styles from "./EditionCard.module.css";

const EditionCard = ({ edition, delta, onOpenGallery }) => {
  const photoCount = Array.from(
    new Set([edition.cover, ...(edition.gallery || [])]),
  ).length;

  const tooltipTargetClass = `team-tooltip-${edition.edition}`;

  return (
    <div className={`${styles.card} defaultLift`}>
      <Tooltip
        target={`.${tooltipTargetClass}`}
        position="top"
        showDelay={150}
        hideDelay={100}
      />
      <div className={styles.cardHeader}>
        <div>
          <span className={styles.editionTag}>Edição {edition.edition}</span>
          <h3 className={styles.cardTitle}>{edition.name}</h3>
          <span className={styles.cardDate}>
            <i className="pi pi-calendar" /> {edition.date}
          </span>
        </div>
        <div className={styles.participantsBadge}>
          <span className={styles.participantsNumber}>
            {edition.participants}
          </span>
          <span className={styles.participantsLabel}>participantes</span>
          {delta !== null && delta !== undefined && (
            <span className={styles.growth}>
              <i className="pi pi-arrow-up" /> {delta}%
            </span>
          )}
        </div>
      </div>

      <div className={styles.gallery}>
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
          {edition.gallery.slice(0, 3).map((src, i) => (
            <button
              key={i}
              type="button"
              className={styles.thumbBtn}
              onClick={() => onOpenGallery(edition, i + 1)}
              aria-label={`Abrir foto ${i + 1} de ${edition.name}`}
            >
              <img
                src={src}
                alt={`${edition.name} - foto ${i + 1}`}
                className={styles.thumb}
              />
            </button>
          ))}
        </div>
      </div>

      <div className={styles.championsBlock}>
        <h4 className={styles.championsTitle}>
          <i className="pi pi-trophy" /> Campeões
        </h4>
        <ul className={styles.championsList}>
          {edition.champions.map((c) => {
            const hasPlayersProp = Array.isArray(c.players);
            const hasTeam = typeof c.team === "string" && c.team.trim() !== "";
            const hasPlayers = hasPlayersProp && c.players.length > 0;

            if (!hasTeam && !hasPlayers) {
              return (
                <li key={c.modality} className={styles.championItem}>
                  <span className={styles.modality}>{c.modality}</span>
                  <span className={styles.teamUnavailable}>
                    Dados não registrados
                  </span>
                </li>
              );
            }

            const tooltipContent = hasPlayersProp
              ? hasPlayers
                ? c.players.join("\n")
                : "Participantes em breve"
              : null;
            return (
              <li key={c.modality} className={styles.championItem}>
                <span className={styles.modality}>{c.modality}</span>
                {tooltipContent ? (
                  <span
                    className={`${styles.team} ${tooltipTargetClass}`}
                    data-pr-tooltip={tooltipContent}
                    data-pr-position="top"
                    tabIndex={0}
                  >
                    {c.team}
                  </span>
                ) : (
                  <span className={styles.teamPlain}>{c.team}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default EditionCard;
