import styles from "./GalleryCarousel.module.css";
import React, { useEffect, useRef, useState } from "react";
import { Galeria } from "../../../services/types";
import { formatDate } from "../../../utils";
import pocketbase from "../../../services/pocketbase";

interface LazyGalleryProps {
  src: string;
  alt: string;
  onClick: any;
  className: string;
}

const LazyGalleryImage = ({
  src,
  alt,
  onClick,
  className,
}: LazyGalleryProps) => {
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

interface CarouselProps {
  content: Galeria | undefined;
  openGallery: any;
}

const GalleryCarousel = ({ content, openGallery }: CarouselProps) => {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const galleryRef = useRef<HTMLDivElement | null>(null);

  const updateScrollState = () => {
    const el = galleryRef.current;
    if (!el) return;

    const tolerance = 5;

    setAtStart(el.scrollLeft <= tolerance);

    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - tolerance);
  };

  const scrollGallery = (direction: number) => {
    galleryRef.current?.scrollBy({
      left: direction * 400,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    console.log(content);

    gallery.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    updateScrollState();

    return () => {
      gallery.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  });

  return (
    <div className={styles.edition}>
      <div className={styles.text}>
        <h1>{content?.nome}</h1>
        {content?.data.toString() !== "" ? (
          <p className={styles.date + " underline"}>
            {formatDate(content?.data)}
          </p>
        ) : null}
        <div className={styles.description}>{content?.descricao}</div>
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
          {content?.imagens.map((img, index) => (
            <LazyGalleryImage
              key={index}
              src={pocketbase.files.getURL(content, img)}
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
