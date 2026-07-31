// @ts-nocheck
import React, { useRef, useState } from "react";
import { Galleria } from "primereact/galleria";
import styles from "./Gallery.module.css";
import editionsContent from "../../assets/json/editionsContent";
import IpfxGalleria from "../../components/common/IpfxGalleria/IpfxGalleria";

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

  const openGallery = (ed, index = 0) => {
    setActiveEdition(ed);
    setActiveIndex(index);
    setTimeout(() => galleriaRef.current?.show(), 0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h1>Evento X</h1>
        <p>lorem ipsum</p>
      </div>
      <div className={styles.gallery}>
        {editionsContent.map((ed, index) => {
          return (
            <img
              src={ed.cover}
              className={styles.image + " simpleHover"}
              onClick={() => openGallery(ed, 0)}
            />
          );
        })}
      </div>

      <IpfxGalleria ctrl={galleryProps} />
    </div>
  );
};

export default Editions;
