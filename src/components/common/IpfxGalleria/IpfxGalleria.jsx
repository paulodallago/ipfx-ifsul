// @ts-nocheck

import React, { useRef, useState } from "react";
import styles from "./IpfxGalleria.module.css";
import { Galleria } from "primereact/galleria";

const IpfxGalleria = (props) => {
  const buildImages = (ed) => {
    const all = [ed.cover, ...(ed.gallery || [])];
    const unique = Array.from(new Set(all));
    return unique.map((src, i) => ({
      itemImageSrc: src,
      thumbnailImageSrc: src,
      alt: `${ed.name} - foto ${i + 1}`,
      title: ed.name,
    }));
  };

  const captionTemplate = (item) => (
    <span className={styles.galleriaCaption}>{item.title}</span>
  );

  const itemTemplate = (item) => (
    <img
      src={item.itemImageSrc}
      alt={item.alt}
      className={styles.galleriaItem}
    />
  );

  const thumbnailTemplate = (item) => (
    <img
      src={item.thumbnailImageSrc}
      alt={item.alt}
      className={styles.galleriaThumb}
    />
  );

  return (
    <Galleria
      ref={props.ctrl.galleriaRef}
      value={
        props.ctrl.activeEdition ? buildImages(props.ctrl.activeEdition) : []
      }
      activeIndex={props.ctrl.activeIndex}
      onItemChange={(e) => props.ctrl.setActiveIndex(e.index)}
      numVisible={5}
      circular
      fullScreen
      showItemNavigators
      showThumbnails
      item={itemTemplate}
      thumbnail={thumbnailTemplate}
      caption={captionTemplate}
    />
  );
};

export default IpfxGalleria;
