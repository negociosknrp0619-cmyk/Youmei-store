import React from 'react';
import styles from './FeaturesBar.module.css';

export default function FeaturesBar() {
  const features = [
    {
      title: 'Pago Seguro',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="2" y1="10" x2="22" y2="10"></line>
        </svg>
      )
    },
    {
      title: 'Asesoramiento',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
        </svg>
      )
    },
    {
      title: 'Garantía productos',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3h12l4 6-10 12L2 9l4-6z"></path>
          <path d="M2 9h20"></path>
          <path d="M12 21L8 9"></path>
          <path d="M12 21l4-12"></path>
          <path d="M6 3l2 6"></path>
          <path d="M18 3l-2 6"></path>
        </svg>
      )
    },
    {
      title: 'Envíos todo Perú',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
          <line x1="4" y1="22" x2="4" y2="15"></line>
        </svg>
      )
    }
  ];

  return (
    <section className={styles.featuresSection}>
      <div className={`container ${styles.featuresContainer}`}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureItem}>
            <div className={styles.iconContainer}>
              {feature.icon}
            </div>
            <h3 className={styles.title}>{feature.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
