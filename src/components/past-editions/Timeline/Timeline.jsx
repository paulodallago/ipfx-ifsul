// @ts-nocheck
import React, { useRef, useState } from "react";
import { Galleria } from "primereact/galleria";
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

  const openGallery = (ed, index = 0) => {
    setActiveEdition(ed);
    setActiveIndex(index);
    setTimeout(() => galleriaRef.current?.show(), 0);
  };

  return (
    <section className={styles.section}>
      <div className={styles.timeline}>
        <div className={styles.timelineLine} aria-hidden="true" />

        {editionsContent.map((ed, index) => {
          const isLeft = index % 2 === 0;
          const prev = editionsContent[index - 1];
          const delta = prev
            ? Math.round(
                ((ed.participants - prev.participants) / prev.participants) *
                  100,
              )
            : null;

          return (
            <div
              key={ed.edition}
              className={`${styles.row} ${isLeft ? styles.rowLeft : styles.rowRight}`}
            >
              <div className={styles.card}>
                <EditionCard
                  edition={ed}
                  delta={delta}
                  onOpenGallery={openGallery}
                />
              </div>
              <div className={styles.marker} aria-hidden="true">
                <span className={styles.markerInner}>{ed.edition}</span>
              </div>
            </div>
          );
        })}
      </div>

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
