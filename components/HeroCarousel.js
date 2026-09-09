"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './HeroCarousel.module.css';

// Aquí configuramos las imágenes del carrusel.
// Cuando pegues tus imágenes, solo debes asegurarte de que los nombres coincidan
// con los de esta lista, o me avisas y los actualizamos.
const slides = [
  {
    id: 1,
    image: '/images/banners/dji-mic-minihd.webp',
    link: '/productos',
    title: 'DJI Mic Mini',
    tagline: 'Audio impecable. Libertad total.',
    description: 'Voces nítidas, cancelación de ruido y libertad inalámbrica.',
    primaryButton: 'Aprender más >',
    secondaryButton: 'Comprar ya 🛒'
  },
  {
    id: 2,
    image: '/images/banners/dji-om8p.webp',
    objectPosition: 'center 0%',
    link: '/productos',
    title: 'DJI OSMO MOBILE 8',
    tagline: 'Movimiento fluido. Creación sin esfuerzo.',
    primaryButton: 'Aprender más >',
    secondaryButton: 'Comprar ya 🛒'
  },
  {
    id: 3,
    image: '/images/banners/dji rs5hd.webp',
    objectPosition: 'center 85%',
    link: '/productos',
    title: 'DJI RS 5 Mini',
    primaryButton: 'Aprender más >',
    secondaryButton: 'Comprar ya 🛒'
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 9000); // 9 segundos para poder leer bien el texto
    return () => clearTimeout(timer);
  }, [current]);

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className={styles.carousel}>
      {/* Flechas de navegación (solo se muestran si hay más de 1 slide) */}
      {length > 1 && (
        <>
          <button className={styles.leftArrow} onClick={prevSlide}>
            &#10094;
          </button>
          <button className={styles.rightArrow} onClick={nextSlide}>
            &#10095;
          </button>
        </>
      )}

      {/* Slides */}
      {slides.map((slide, index) => {
        return (
          <div
            className={index === current ? `${styles.slide} ${styles.active}` : styles.slide}
            key={index}
          >
            {index === current && (
              <div className={styles.imageContainer}>
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  style={{ objectFit: 'cover', objectPosition: slide.objectPosition || 'center' }}
                  priority={index === 0}
                  sizes="100vw"
                  quality={100}
                  unoptimized={true}
                />
                <div className={styles.textOverlay}>
                  {slide.subtitle && <p className={styles.subtitle}>{slide.subtitle}</p>}
                  <h1 className={styles.title}>{slide.title}</h1>
                  <h3 className={styles.tagline}>{slide.tagline}</h3>
                  <p className={styles.description}>{slide.description}</p>
                  <div className={styles.buttonGroup}>
                    <Link href={slide.link} className={styles.primaryBtn}>
                      {slide.primaryButton}
                    </Link>
                    <Link href={slide.link} className={styles.secondaryBtn}>
                      {slide.secondaryButton}
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className={styles.sidebar}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={index === current ? `${styles.sidebarItem} ${styles.activeSidebarItem}` : styles.sidebarItem}
            onClick={() => setCurrent(index)}
          >
            {slide.title}
          </div>
        ))}
      </div>
    </section>
  );
}
