// @ts-nocheck
import styles from "./GalleryCarousel.module.css";
import React, { useEffect, useRef, useState } from "react";

const LazyGalleryImage = ({ src, alt, onClick, className }) => {
  const imgRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = imgRef.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "200px 0px",
        threshold: 0.01,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={shouldLoad ? src : undefined}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      onClick={onClick}
      style={
        shouldLoad
          ? undefined
          : {
              background: "rgba(255, 255, 255, 0.08)",
              minWidth: "140px",
            }
      }
    />
  );
};

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

    gallery.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    updateScrollState();

    return () => {
      gallery.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  return (
    <div className={styles.edition}>
      <div className={styles.text}>
        <h1>{content.name}</h1>
        {content.date !== null ? (
          <p className={styles.date + " underline"}>{content.date}</p>
        ) : null}
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
            <LazyGalleryImage
              key={index}
              src={img}
              alt=""
              className={styles.image}
              onClick={() => openGallery(content, index)}
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
