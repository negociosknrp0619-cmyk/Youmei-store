'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './FloatingTestimonial.module.css';

const reviews = [
  {
    text: "Excelente equipo, primera vez que compro y todo llegó súper rápido 📦 Material Completo 👍 está destinado para todos, fue de gran ayuda para iniciar en este maravilloso mundo audiovisual 😍 Gracias 🙌",
    author: "Jenny Molina"
  },
  {
    text: "Súper recomendado!! al inicio lo dudé mucho pero me fue de gran ayuda la asesoría con ejemplos muy prácticos y reales!! 📸 Muy buen servicio!!",
    author: "Chavely Matias"
  },
  {
    text: "Los aros de luz y los trípodes son muy estables y duraderos. Llevo meses usándolos todos los días y siguen como nuevos ✨ 100% recomendados.",
    author: "Camila Rojas"
  },
  {
    text: "Necesitaba micrófonos de solapa de urgencia y el envío llegó al día siguiente. Me salvaron la cobertura de un evento muy importante 🎙️",
    author: "Renzo Salazar"
  },
  {
    text: "Increíble atención y los equipos llegaron en perfecto estado. Definitivamente volveré a comprar aquí para mis próximas producciones 🎬",
    author: "Carlos Ruiz"
  }
];

export default function FloatingTestimonial() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentReview, setCurrentReview] = useState(reviews[0]);
  const pathname = usePathname();

  useEffect(() => {
    let hideTimeout;
    let showTimeout;

    const loop = () => {
      // Pick a random review different from the current one if possible
      setCurrentReview((prev) => {
        let newReview = prev;
        while (newReview.author === prev.author) {
          newReview = reviews[Math.floor(Math.random() * reviews.length)];
        }
        return newReview;
      });

      // Show the popup
      setIsVisible(true);

      // Hide after 25 seconds
      hideTimeout = setTimeout(() => {
        setIsVisible(false);
        // Wait 25 seconds while hidden, then show again
        showTimeout = setTimeout(loop, 25000);
      }, 25000);
    };

    // Initial delay before showing the first popup (20 seconds after page load)
    const initialDelay = setTimeout(loop, 20000);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(hideTimeout);
      clearTimeout(showTimeout);
    };
  }, []);

  if (pathname !== '/') return null;

  return (
    <div className={`${styles.popup} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.stars}>★★★★★</div>
      <p className={styles.text}>{currentReview.text}</p>
      <p className={styles.author}>{currentReview.author}</p>
    </div>
  );
}
