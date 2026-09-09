'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './Testimonials.module.css';

const testimonialsData = [
  {
    id: 1,
    name: 'Scheler Santisteban',
    role: 'Creador de Contenido (Lima)',
    image: '/images/testimonios/379915072_1441225743111534_8326316041619514733_n.jpg',
    text: '"Excelente información, equipos de primera calidad y envíos rápidos a todo el Perú, la explicación clara del contenido, recomiendo al 100%"'
  },
  {
    id: 2,
    name: 'Luis Mendoza',
    role: 'Filmmaker (Arequipa)',
    image: '/images/testimonios/437783174_10225060761614064_7554775940725861078_n.jpg',
    text: '"Muy buenos equipos, me llegó rapidísimo hasta Arequipa. La atención es recontra fácil de comprender, es una buena opción para generar nuevas ideas."'
  },
  {
    id: 3,
    name: 'Jorge Estrada y Equipo',
    role: 'Fotógrafos (Cusco)',
    image: '/images/testimonios/461745723_4697082620516911_2762912720293789418_n.jpg',
    text: '"¡Súper recomendado! Al inicio lo dudé mucho pero me fue de gran ayuda la asesoría. Me enviaron mis cosas a Cusco sin problemas. ¡Muy buen servicio, de verdad!"'
  },
  {
    id: 4,
    name: 'Carlos Ruiz',
    role: 'Productor Audiovisual (Trujillo)',
    image: '/images/testimonios/468812387_1128514415505768_1074946569351416087_n.jpg',
    text: '"Increíble atención y los equipos llegaron en perfecto estado. Definitivamente volveré a comprar aquí para mis próximas chambas de video."'
  },
  {
    id: 5,
    name: 'Andrea Gómez',
    role: 'Youtuber (Lima)',
    image: '/images/testimonios/556969816_1825857394722097_4645389374743852869_n.jpg',
    text: '"Me encantó la variedad de luces que tienen. Fui a la tienda y los chicos me ayudaron un montón. Desde que compré aquí, mis videos se ven súper chéveres."'
  },
  {
    id: 6,
    name: 'Diego Villanueva',
    role: 'Director de Arte (Piura)',
    image: '/images/testimonios/619494109_4388632138125765_9112852660227114856_n.jpg',
    text: '"El soporte postventa es excepcional. Me ayudaron a configurar mi estabilizador paso a paso por WhatsApp. 10/10 en atención al cliente, lo máximo."'
  },
  {
    id: 7,
    name: 'Lucía Fernández',
    role: 'Diseñadora (Lima)',
    image: '/images/testimonios/724010033_27117352844558110_8794687994560060228_n.jpg',
    text: '"Precios muy competitivos y marcas originales con garantía aquí en Perú. No arriesgaría mi herramienta de trabajo comprando en otro lado, de frente con YoumeiStore."'
  },
  {
    id: 8,
    name: 'Camila Rojas',
    role: 'Fotógrafa de Bodas (Chiclayo)',
    image: '/images/testimonios/764752299_3423932024481561_7336453331083369299_n.jpg',
    text: '"Necesitaba micrófonos de solapa de urgencia y el envío por Olva llegó rapidísimo. Me salvaron la cobertura de un tono importante."'
  },
  {
    id: 9,
    name: 'Renzo Salazar',
    role: 'Vlogger (Lima)',
    image: '/images/testimonios/783111520_27931047056561586_6577768111934327883_n.jpg',
    text: '"Los aros de luz y los trípodes son muy estables. Llevo meses usándolos para mis tiktoks y siguen paraditos. Buena inversión pata."'
  },
  {
    id: 10,
    name: 'Sofia Torres',
    role: 'Ingeniera de Sonido (Huancayo)',
    image: '/images/testimonios/783508048_122104422597445223_3250377818023913144_n.jpg',
    text: '"Excelente catálogo de micrófonos. Encontré modelos de DJI y Hollyland que estaban agotados en todo Polvos y en otras tiendas de Lima. ¡Altamente recomendados!"'
  },
  {
    id: 11,
    name: 'Martín Paredes',
    role: 'Agencia de Marketing (Lima)',
    image: '/images/testimonios/789217815_27376565365352361_8716512758040401635_n.jpg',
    text: '"Equipamos todo nuestro estudio de grabación corporativo gracias a la asesoría de los chicos de YoumeiStore. Todo funciona bacán."'
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, testimonialsData.length - 3) : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= testimonialsData.length - 3 ? 0 : prevIndex + 1
    );
  };

  // We show 3 items at a time
  const visibleTestimonials = testimonialsData.slice(currentIndex, currentIndex + 3);
  // If we reach the end and don't have 3 items left, we wrap around or just show the last 3.
  // A simpler way for a demo is to just show 3 items based on index.
  const displayItems = testimonialsData.length >= 3 
    ? testimonialsData.slice(currentIndex, currentIndex + 3).length < 3 
      ? [...testimonialsData.slice(currentIndex), ...testimonialsData.slice(0, 3 - testimonialsData.slice(currentIndex).length)]
      : testimonialsData.slice(currentIndex, currentIndex + 3)
    : testimonialsData;

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Testimonios</h2>
          <div className={styles.underline}></div>
          <p className={styles.subtitle}>
            Te brindamos algunos testimonios de nuestros cientos de clientes satisfechos a la fecha
          </p>
        </div>

        <div className={styles.carouselWrapper}>
          <button className={`${styles.navButton} ${styles.prev}`} onClick={handlePrev} aria-label="Anterior">
            &#10094;
          </button>
          
          <div className={styles.testimonialsGrid}>
            {displayItems.map((testimonial) => (
              <div key={testimonial.id} className={styles.testimonialCard}>
                <div className={styles.avatarContainer}>
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className={styles.avatar} 
                  />
                </div>
                <h3 className={styles.name}>{testimonial.name}</h3>
                <p className={styles.role}>{testimonial.role}</p>
                <p className={styles.text}>{testimonial.text}</p>
              </div>
            ))}
          </div>

          <button className={`${styles.navButton} ${styles.next}`} onClick={handleNext} aria-label="Siguiente">
            &#10095;
          </button>
        </div>

        <div className={styles.pagination}>
          {Array.from({ length: Math.ceil(testimonialsData.length / itemsPerPage) }).map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${currentIndex === idx * itemsPerPage ? styles.activeDot : ''}`}
              onClick={() => setCurrentIndex(idx * itemsPerPage)}
              aria-label={`Ir a la página ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
