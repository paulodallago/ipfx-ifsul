import IpfxGalleria from "../../common/IpfxGalleria/IpfxGalleria.tsx";
import GalleryCarousel from "../../Gallery/GalleryCarousel/GalleryCarousel.tsx";
import styles from "./LastEvent.module.css";
import React, { useEffect, useRef, useState } from "react";
import { Galeria } from "../../../services/types.ts";
import pocketbase from "../../../services/pocketbase.js";

const LastEvent = () => {
  const galleriaRef = useRef<{ show: () => void } | null>(null);

  const [activeEdition, setActiveEdition] = useState<Galeria>();
  const [activeIndex, setActiveIndex] = useState(0);

  const [data, setData] = useState<Galeria>();

  useEffect(() => {
    (async () => {
      setData(
        await pocketbase
          .collection("galerias")
          .getFirstListItem("", { sort: "-data" }),
      );
    })();
  }, []);

  const galleryProps = {
    galleriaRef,
    activeEdition,
    activeIndex,
    setActiveEdition,
    setActiveIndex,
  };

  const openGallery = (data: Galeria, index = 0) => {
    setActiveEdition(data);
    setActiveIndex(index);
    setTimeout(() => galleriaRef.current?.show(), 0);
  };

  return (
    <div className={styles.container}>
      <h2>Último evento</h2>

      <GalleryCarousel
        key={data?.nome}
        content={data}
        openGallery={openGallery}
      />

      <IpfxGalleria ctrl={galleryProps} />
    </div>
  );
};

export default LastEvent;
