"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import styles from "./HeroCarousel.module.css";

const slides = [
  {
    id: 1,
    imageDesktop: "/Banner/bannerHero1.png",
    imageMobile: "/BannerMobile/Banner1.png",
    alt: "Coleção de Brincos Exclusivos",
    link: "/categoria/brincos",
  },
  {
    id: 2,
    imageDesktop: "/Banner/conjuntos.png",
    imageMobile: "/BannerMobile/Banner2.png",
    alt: "Conjuntos Perfeitos para Você",
    link: "/categoria/conjuntos",
  },
  {
    id: 3,
    imageDesktop: "/Banner/aneis.png",
    imageMobile: "/BannerMobile/Banner3.png",
    alt: "Anéis de Luxo e Sofisticação",
    link: "/categoria/aneis",
  },
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((slide) => (
            <div className={styles.embla__slide} key={slide.id}>
              <Link href={slide.link} className={styles.link}>
                <div className={styles.desktopImageWrapper}>
                  <Image
                    src={slide.imageDesktop}
                    alt={slide.alt}
                    fill
                    className={styles.image}
                    priority={slide.id === 1}
                  />
                </div>
                <div className={styles.mobileImageWrapper}>
                  <Image
                    src={slide.imageMobile}
                    alt={slide.alt}
                    fill
                    className={styles.image}
                    priority={slide.id === 1}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              index === selectedIndex ? styles["dot--selected"] : ""
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
