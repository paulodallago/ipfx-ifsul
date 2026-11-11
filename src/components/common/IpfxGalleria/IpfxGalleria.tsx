import React from "react";
import styles from "./IpfxGalleria.module.css";
import { Galleria } from "primereact/galleria";
import pocketbase from "../../../services/pocketbase";

const IpfxGalleria = (props: any) => {
  const { ctrl } = props;
  const isVisible = Boolean(ctrl?.activeEdition);

  const buildImages = (ed: any) => {
    if (!ed) return [];

    return ed.imagens.map((img: string, i: number) => ({
      itemImageSrc: pocketbase.files.getURL(ed, img),
      thumbnailImageSrc: pocketbase.files.getURL(ed, img),
      alt: `${ed.nome} - foto ${i + 1}`,
      title: ed.nome,
    }));
  };

  const closeGallery = () => {
    ctrl?.setActiveEdition(null);
    ctrl?.setActiveIndex(0);
  };

  const captionTemplate = (item: any) => (
    <span className={styles.galleriaCaption}>{item.title}</span>
  );

  const itemTemplate = (item: any) => (
    <img
      src={item.itemImageSrc}
      alt={item.alt}
      className={styles.galleriaItem}
      loading="eager"
      decoding="async"
    />
  );

  const thumbnailTemplate = (item: any) => (
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
      hidden={!isVisible}
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
