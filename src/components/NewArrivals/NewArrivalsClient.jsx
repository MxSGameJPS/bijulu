"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./NewArrivals.module.css";
import ProductCard from "../ProductCard/ProductCard";

export default function NewArrivalsClient({ products }) {
  // Config: 4 items, loop, autoplay se > 4
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // if (products.length === 0) return null;

  return (
    <section className={styles.sectionWrapper}>
      <h2 className={styles.title}>LANÇAMENTOS</h2>

      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.embla__container}>
          {products.map((product) => (
            <div className={styles.embla__slide} key={product.id.toString()}>
              <ProductCard product={product} />
            </div>
          ))}
          {/* Fakes para testar layout se banco vazio (remover em produção ou deixar comentado) */}
          {products.length === 0 &&
            Array.from({ length: 4 }).map((_, i) => (
              <div className={styles.embla__slide} key={i}>
                <div style={{ padding: "2rem", textAlign: "center" }}>
                  Produto Exemplo {i + 1}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className={styles.navigation}>
        <button
          className={styles.navButton}
          onClick={scrollPrev}
          aria-label="Anterior"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className={styles.navButton}
          onClick={scrollNext}
          aria-label="Próximo"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
