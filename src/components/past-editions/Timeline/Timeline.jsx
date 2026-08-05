// @ts-nocheck
import React, { useRef, useState } from "react";
import { Timeline as PrimeTimeline } from "primereact/timeline";
import styles from "./Timeline.module.css";
import editionsContent from "../../../assets/json/editionsContent";
import EditionCard from "../EditionCard/EditionCard";
import IpfxGalleria from "../../common/IpfxGalleria/IpfxGalleria";

const Timeline = () => {
  const totalParticipants = editionsContent.reduce(
    (acc, ed) => acc + ed.participants,
    0,
  );

  const firstParticipants = editionsContent[0]?.participants ?? 0;
  const lastParticipants =
    editionsContent[editionsContent.length - 1]?.participants ?? 0;

  const growth =
    firstParticipants > 0
      ? Math.round(
          ((lastParticipants - firstParticipants) / firstParticipants) * 100,
        )
      : 0;

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

  const events = editionsContent.map((edition, index) => {
    const previous = editionsContent[index - 1];

    return {
      edition,
      delta: previous
        ? Math.round(
            ((edition.participants - previous.participants) /
              previous.participants) *
              100,
          )
        : null,
    };
  });

  const marker = (item) => (
    <div className={styles.marker}>
      <span className={styles.markerInner}>{item.edition.edition}</span>
    </div>
  );

  const content = (item) => (
    <EditionCard
      edition={item.edition}
      delta={item.delta}
      onOpenGallery={openGallery}
    />
  );

  return (
    <section className={styles.section}>
      <PrimeTimeline
        value={events}
        align="alternate"
        className={styles.timeline}
        marker={marker}
        content={content}
      />

      <div className={styles.statsStrip}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{editionsContent.length}</span>
          <span className={styles.statLabel}>edições realizadas</span>
        </div>

        <span className={styles.statDivider} />

        <div className={styles.stat}>
          <span className={styles.statValue}>{totalParticipants}+</span>
          <span className={styles.statLabel}>participantes ao total</span>
        </div>

        <span className={styles.statDivider} />

        <div className={styles.stat}>
          <span className={styles.statValue}>+{growth}%</span>
          <span className={styles.statLabel}>de crescimento</span>
        </div>
      </div>

      <IpfxGalleria ctrl={galleryProps} />
    </section>
  );
};

export default Timeline;
