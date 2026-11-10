import React, { useEffect, useRef, useState } from "react";
import styles from "./Gallery.module.css";
import IpfxGalleria from "../../components/common/IpfxGalleria/IpfxGalleria.tsx";
import GalleryCarousel from "../../components/Gallery/GalleryCarousel/GalleryCarousel.tsx";
import { Galeria } from "../../services/types.ts";
import pocketbase from "../../services/pocketbase.js";

const Editions = () => {
  const galleriaRef = useRef<{ show: () => void } | null>(null);

  const [activeEdition, setActiveEdition] = useState<Galeria>();
  const [activeIndex, setActiveIndex] = useState(0);

  const [data, setData] = useState<Galeria[]>([]);

  useEffect(() => {
    (async () => {
      setData(
        await pocketbase.collection("galerias").getFullList({ sort: "-data" }),
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

  const openGallery = (edition: Galeria, index = 0) => {
    setActiveEdition(edition);
    setActiveIndex(index);
    setTimeout(() => galleriaRef.current?.show(), 0);
  };

  return (
    <div className={styles.container}>
      {data.map((edition: Galeria) => (
        <div key={edition.nome}>
          <GalleryCarousel
            key={edition.id}
            content={edition}
            openGallery={openGallery}
          />
          <hr className={styles.divider} />
        </div>
      ))}

      <IpfxGalleria ctrl={galleryProps} />
    </div>
  );
};

export default Editions;
