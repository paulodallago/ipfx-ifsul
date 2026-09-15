// @ts-nocheck
import React, { useRef, useState } from "react";
import styles from "./Gallery.module.css";
import galleryContent from "../../assets/json/galleryContent";
import IpfxGalleria from "../../components/common/IpfxGalleria/IpfxGalleria";
import GalleryCarousel from "../../components/Gallery/GalleryCarousel/GalleryCarousel";

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
      {galleryContent.map((edition) => (
        <div>
          <GalleryCarousel
            key={edition.name}
            content={edition}
            openGallery={openGallery}
          />
          <hr />
        </div>
      ))}

      <IpfxGalleria ctrl={galleryProps} />
    </div>
  );
};

export default Editions;
