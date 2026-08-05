// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import styles from "./Gallery.module.css";
import editionsContent from "../../assets/json/editionsContent";
import IpfxGalleria from "../../components/common/IpfxGalleria/IpfxGalleria";
import GalleryCarousel from "../../components/Gallery/GalleryCarousel/GalleryCarousel";
import { Divider } from "primereact/divider";

const Editions = () => {
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
      <GalleryCarousel content={editionsContent[0]} openGallery={openGallery} />
      <hr />
      <GalleryCarousel content={editionsContent[1]} openGallery={openGallery} />

      <IpfxGalleria ctrl={galleryProps} />
    </div>
  );
};

export default Editions;
