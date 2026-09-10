import React from 'react';
import Link from 'next/link';
import styles from './FavoriteCategories.module.css';

const categoryData = [
  { id: 'camaras', name: 'Cámaras', image: '/images/Secciones/camarass.png', link: '/productos?category=video' },
  { id: 'audio', name: 'Audio', image: '/images/Secciones/Audio.png', link: '/productos?category=microfonos' },
  { id: 'estabilizadores', name: 'Estabilizadores', image: '/images/Secciones/estabilizadores.png', link: '/productos?category=estabilizadores' },
  { id: 'iluminacion', name: 'Iluminación', image: '/images/Secciones/iluminacion.png', link: '/productos?category=luces' },
  { id: 'soporte', name: 'Soporte', image: '/images/Secciones/soporte.png', link: '/productos?category=soporte' },
  { id: 'accesorios', name: 'Accesorios', image: '/images/Secciones/accesorios.png', link: '/productos?category=accesorios' }
];

export default function FavoriteCategories() {
  return (
    <section className={styles.categoriesSection}>
      <div className="container">
        <h2 className={styles.title}>Descubre por Categoría</h2>
        
        <div className={styles.categoriesGrid}>
          {categoryData.map((cat) => (
            <Link href={cat.link} key={cat.id} className={styles.categoryItem}>
              <div className={styles.imageWrapper}>
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className={styles.image}
                  loading="lazy"
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.categoryName}>{cat.name}</h3>
                <span className={styles.arrow}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
