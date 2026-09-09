import React from 'react';
import Image from 'next/image';
import styles from './BrandCarousel.module.css';

const brands = [
  { name: 'DJI', src: '/images/logos marcas carrusel/Dji.png' },
  { name: 'Hollyland', src: '/images/logos marcas carrusel/Hollyland.png' },
  { name: 'SmallRig', src: '/images/logos marcas carrusel/SmallRig.png' },
  { name: 'Ulanzi', src: '/images/logos marcas carrusel/Ulanzi.png' },
  { name: 'Godox', src: '/images/logos marcas carrusel/godox.png' },
  { name: 'Hohem', src: '/images/logos marcas carrusel/hohem.png' },
];

export default function BrandCarousel() {
  return (
    <section className={styles.brandSection}>
      <div className={styles.container}>
        <div className={styles.marqueeContainer}>
          <div className={styles.marquee}>
            <div className={styles.marqueeContent}>
              {brands.map((brand, index) => (
                <div key={`brand-1-${index}`} className={styles.brandWrapper}>
                  <Image 
                    src={brand.src} 
                    alt={brand.name} 
                    width={350} 
                    height={150} 
                    className={styles.brandImage} 
                  />
                </div>
              ))}
            </div>
            {/* Duplicamos el contenido para el efecto infinito continuo */}
            <div className={styles.marqueeContent}>
              {brands.map((brand, index) => (
                <div key={`brand-2-${index}`} className={styles.brandWrapper}>
                  <Image 
                    src={brand.src} 
                    alt={brand.name} 
                    width={350} 
                    height={150} 
                    className={styles.brandImage} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
