// @ts-nocheck
import React, { useRef, useState } from "react";
import { Timeline as PrimeTimeline } from "primereact/timeline";
import styles from "./Timeline.module.css";
import editionsContent from "../../../assets/json/eventsContent";
import EditionCard from "../EditionCard/EditionCard";
import IpfxGalleria from "../../common/IpfxGalleria/IpfxGalleria";
import { useMatchMedia } from "@primereact/hooks";

const Timeline = () => {
  const totalParticipants = editionsContent.reduce(
    (acc, ed) => acc + ed.participants,
    0,
  );

  const galleriaRef = useRef(null);
  const [activeEdition, setActiveEdition] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const galleryProps = {
    galleriaRef,
    activeEdition,
    activeIndex,
    setActiveEdition,
    setActiveIndex,
  };

  const openGallery = (edition, index = 0) => {
    setActiveEdition(edition);
    setActiveIndex(index);
    setTimeout(() => galleriaRef.current?.show(), 0);
  };

  const marker = (item) => (
    <div className={styles.marker}>
      <span className={styles.markerInner}>{item.edition.edition}</span>
    </div>
  );

  const content = (item) => (
    <EditionCard
      edition={item.edition}
      onOpenGallery={openGallery}
      className={styles.editionCard}
    />
  );

  const isMobile = useMatchMedia("(max-width: 768px)");

  return (
    <section className={styles.section}>
      <PrimeTimeline
        value={editionsContent.map((edition) => ({ edition }))}
        align={isMobile ? "left" : "down"}
        className={styles.timeline}
        marker={marker}
        content={content}
        layout={isMobile ? "vertical" : "horizontal"}
      />

      <div className={styles.statsStrip}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{editionsContent.length}</span>
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
