// @ts-nocheck

import React from "react";
import styles from "./IpfxGalleria.module.css";
import { Galleria } from "primereact/galleria";

const IpfxGalleria = (props) => {
  const { ctrl } = props;
  const isVisible = Boolean(ctrl?.activeEdition);

  const buildImages = (ed) => {
    if (!ed) return [];

    const gallery = Array.isArray(ed.gallery) ? ed.gallery.filter(Boolean) : [];
    const images = [];

    if (ed.cover && ed.cover !== gallery[0]) {
      images.push(ed.cover);
    }

    gallery.forEach((src) => {
      if (src && !images.includes(src)) {
        images.push(src);
      }
    });

    return images.map((src, i) => ({
      itemImageSrc: src,
      thumbnailImageSrc: src,
      alt: `${ed.name} - foto ${i + 1}`,
      title: ed.name,
    }));
  };

  const closeGallery = () => {
    ctrl?.setActiveEdition(null);
    ctrl?.setActiveIndex(0);
  };

  const captionTemplate = (item) => (
    <span className={styles.galleriaCaption}>{item.title}</span>
  );

  const itemTemplate = (item) => (
    <img
      src={item.itemImageSrc}
      alt={item.alt}
      className={styles.galleriaItem}
      loading="eager"
      decoding="async"
    />
  );

  const thumbnailTemplate = (item) => (
    <img
      src={item.thumbnailImageSrc}
      alt={item.alt}
      className={styles.galleriaThumb}
      loading="lazy"
      decoding="async"
    />
  );

  return (
    <Galleria
      ref={ctrl?.galleriaRef}
      visible={isVisible}
      onHide={closeGallery}
      value={ctrl?.activeEdition ? buildImages(ctrl.activeEdition) : []}
      activeIndex={ctrl?.activeIndex ?? 0}
      onItemChange={(e) => ctrl?.setActiveIndex(e.index)}
      numVisible={5}
      circular
      fullScreen
      showItemNavigators
      showThumbnails
      closeIcon="pi pi-times"
      item={itemTemplate}
      thumbnail={thumbnailTemplate}
      caption={captionTemplate}
      className={styles.galleria}
    />
  );
};

export default IpfxGalleria;
