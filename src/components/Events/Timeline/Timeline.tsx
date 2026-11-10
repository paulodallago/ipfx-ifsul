import React, { useEffect, useRef, useState } from "react";
import { Timeline as PrimeTimeline } from "primereact/timeline";
import styles from "./Timeline.module.css";
import IpfxGalleria from "../../common/IpfxGalleria/IpfxGalleria.tsx";
import { useMatchMedia } from "@primereact/hooks";
import { Evento } from "../../../services/types.ts";
import pocketbase from "../../../services/pocketbase.js";
import EventCard from "../EventCard/EventCard.tsx";

const Timeline = () => {
  const galleriaRef = useRef<{ show: () => void } | null>(null);
  const [activeEdition, setActiveEdition] = useState<Evento>();
  const [activeIndex, setActiveIndex] = useState(0);

  const [data, setData] = useState<Evento[]>([]);

  useEffect(() => {
    (async () => {
      setData(await pocketbase.collection("eventos").getFullList());
    })();
  }, []);

  const totalParticipants = data.reduce(
    (acc, ed) => acc + ed.qtd_participantes,
    0,
  );

  const galleryProps = {
    galleriaRef,
    activeEdition,
    activeIndex,
    setActiveEdition,
    setActiveIndex,
  };

  const openGallery = (event: Evento, index = 0) => {
    setActiveEdition(event);
    setActiveIndex(index);
    setTimeout(() => galleriaRef.current?.show(), 0);
  };

  const marker = (event: Evento) => (
    <div className={styles.marker}>
      <span className={styles.markerInner}>{event.marcador}</span>
    </div>
  );

  const content = (event: Evento) => (
    <EventCard
      edition={event}
      onOpenGallery={openGallery}
      className={styles.eventCard}
    />
  );

  const isMobile = useMatchMedia("(max-width: 768px)");

  return (
    <section className={styles.section}>
      <PrimeTimeline
        value={data}
        align={isMobile ? "left" : "top"}
        className={styles.timeline}
        marker={marker}
        content={content}
        layout={isMobile ? "vertical" : "horizontal"}
      />

      <div className={styles.statsStrip}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{data.length}</span>
          <span className={styles.statLabel}>eventos realizados</span>
        </div>

        <span className={styles.statDivider} />

        <div className={styles.stat}>
          <span className={styles.statValue}>{totalParticipants}+</span>
          <span className={styles.statLabel}>participantes ao total</span>
        </div>
      </div>

      <IpfxGalleria ctrl={galleryProps} />
    </section>
  );
};

export default Timeline;
