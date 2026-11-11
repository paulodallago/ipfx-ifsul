import React, { useState } from "react";
import styles from "./EventCard.module.css";
import { Evento, Modalidade } from "../../../services/types.ts";
import { formatDate } from "../../../utils.js";
import pocketbase from "../../../services/pocketbase.js";

const ModalityItem = ({ categoria, podio }: Modalidade) => {
  const hasTeam = podio[0]?.jogador?.trim();

  if (!hasTeam) {
    return (
      <li className={styles.championItem}>
        <span className={styles.modality}>{podio[0].posicao}</span>
        <span className={styles.teamUnavailable}>Dados não registrados</span>
      </li>
    );
  }

  return (
    <li key={categoria}>
      <h4>Categoria: {categoria}</h4>
      {podio.map((player, index) => (
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
          <span className={styles.modality}>{player.posicao}</span>
          <span className={styles.team}>{player.jogador}</span>
        </div>
      ))}
    </li>
  );
};

interface EventCardProps {
  edition: Evento;
  onOpenGallery: any;
  className: any;
}

const EventCard = ({ edition, onOpenGallery, className }: EventCardProps) => {
  const images = Array.isArray(edition.imagens)
    ? edition.imagens.filter(Boolean)
    : [];
  const cover = pocketbase.files.getURL(edition, edition.imagens[0]);
  const photoCount = images.length;
  const [expanded, setExpanded] = useState(false);

  const visibleModalities = edition.modalidades
    ? expanded
      ? edition.modalidades
      : edition.modalidades.slice(0, 1)
    : null;

  return (
    <div className={`${styles.card} defaultLift ${className}`}>
      <header className={styles.cardHeader}>
        <div>
          <span className={styles.editionTag}>Edição {edition.marcador}</span>

          <h3 className={styles.cardTitle}>{edition.nome}</h3>

          <span className={styles.cardDate}>
            <i className="pi pi-calendar" />
            {formatDate(edition.data)}
          </span>
        </div>

        {edition.qtd_participantes > 0 ? (
          <div className={styles.participantsBadge}>
            <span className={styles.participantsNumber}>
              {edition.qtd_participantes}
            </span>

            <span className={styles.participantsLabel}>participantes</span>
          </div>
        ) : null}
      </header>

      {cover ? (
        <section>
          <button
            type="button"
            className={styles.coverBtn}
            onClick={() => onOpenGallery(edition, 0)}
            aria-label={`Abrir galeria de ${edition.nome}`}
          >
            <img
              src={cover}
              alt={`${edition.nome} - destaque`}
              className={styles.cover}
            />

            <span className={styles.coverOverlay}>
              <i className="pi pi-images" />
              <span>Ver {photoCount} fotos</span>
            </span>
          </button>
        </section>
      ) : null}

      {visibleModalities ? (
        <section className={styles.championsBlock}>
          <h4 className={styles.championsTitle}>
            <i className="pi pi-trophy" />
            Campeões
          </h4>

          <div className={styles.championsList}>
            {visibleModalities.map((modality: Modalidade, index) => (
              <ModalityItem
                key={index}
                categoria={modality.categoria}
                podio={modality.podio}
              />
            ))}

            <button
              type="button"
              className={styles.seeMoreButton}
              onClick={() => setExpanded((prev) => !prev)}
              hidden={edition.modalidades.length <= 1}
            >
              {expanded ? "Ver menos" : "Ver mais"}
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default EventCard;
