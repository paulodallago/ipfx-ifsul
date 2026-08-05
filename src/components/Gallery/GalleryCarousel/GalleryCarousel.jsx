// @ts-nocheck
import styles from "./GalleryCarousel.module.css";
import React, { useEffect, useRef, useState } from "react";

const GalleryCarousel = ({ content, openGallery }) => {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const galleryRef = useRef(null);

  const updateScrollState = () => {
    const el = galleryRef.current;
    if (!el) return;

    const tolerance = 5;

    setAtStart(el.scrollLeft <= tolerance);

    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - tolerance);
  };

  const scrollGallery = (direction) => {
    galleryRef.current?.scrollBy({
      left: direction * 400,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const images = gallery.querySelectorAll("img");

    Promise.all(
      [...images].map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve;
            }),
      ),
    ).then(updateScrollState);

    gallery.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      gallery.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  return (
    <div className={styles.edition}>
      <div className={styles.text}>
        <h1>{content.name}</h1>
        <p>{content.description}</p>
      </div>

      <div
        className={`${styles.galleryWrapper}
          ${atStart ? styles.noLeftFade : ""}
          ${atEnd ? styles.noRightFade : ""}
        `}
      >
        <button
          className={`${styles.navButton} ${styles.left}`}
          onClick={() => scrollGallery(-1)}
          disabled={atStart}
        >
          <i className="pi pi-chevron-left" />
        </button>

        <div ref={galleryRef} className={styles.gallery}>
          {content.gallery.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              className={styles.image}
              onClick={() => openGallery(content, index + 1)}
            />
          ))}
        </div>

        <button
          className={`${styles.navButton} ${styles.right}`}
          onClick={() => scrollGallery(1)}
          disabled={atEnd}
        >
          <i className="pi pi-chevron-right" />
        </button>
      </div>
    </div>
  );
};

export default GalleryCarousel;
