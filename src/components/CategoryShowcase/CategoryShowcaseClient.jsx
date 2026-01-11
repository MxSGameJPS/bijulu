"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./CategoryShowcase.module.css";

// Client Component to handle display logic (Grid vs Carousel)
export default function CategoryShowcaseClient({ categories }) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const shouldUseCarousel = categories.length > 5;

  // Placeholder image se a categoria nao tiver imagem
  const getImageUrl = (url) => url || "/placeholder-category.png"; // Você precisará criar ou ter essa imagem, ou usar uma condicional

  const Card = ({ category }) => (
    <Link href={`/categoria/${category.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {category.imagemUrl ? (
          <Image
            src={category.imagemUrl}
            alt={category.nomeCategoria}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#eee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ccc",
            }}
          >
            Sem Imagem
          </div>
        )}
      </div>
      <span className={styles.cardTitle}>{category.nomeCategoria}</span>
    </Link>
  );

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>
            COMPRE POR
            <span>CATEGORIA</span>
          </h2>
        </div>

        <div className={styles.contentSection}>
          {shouldUseCarousel ? (
            <div className={styles.embla} ref={emblaRef}>
              <div className={styles.embla__container}>
                {categories.map((cat) => (
                  <div className={styles.embla__slide} key={cat.id.toString()}>
                    <Card category={cat} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.grid}>
              {categories.map((cat) => (
                <Card key={cat.id.toString()} category={cat} />
              ))}
              {categories.length === 0 && <p>Nenhuma categoria encontrada.</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
