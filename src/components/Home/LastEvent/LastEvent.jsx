// @ts-nocheck
import galleryContent from "../../../assets/json/galleryContent";
import IpfxGalleria from "../../common/IpfxGalleria/IpfxGalleria";
import GalleryCarousel from "../../Gallery/GalleryCarousel/GalleryCarousel";
import styles from "./LastEvent.module.css";
import React, { useRef, useState } from "react";

const LastEvent = () => {
  const edition = galleryContent[galleryContent.length - 1];

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

  return (
    <div className={styles.container}>
      <h2>Último evento</h2>

      <GalleryCarousel
        key={edition.name}
        content={edition}
        openGallery={openGallery}
      />

      <IpfxGalleria ctrl={galleryProps} />
    </div>
  );
};

export default LastEvent;
