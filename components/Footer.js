"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const [openSection, setOpenSection] = useState(null);

  const toggle = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Col 1: Always visible */}
        <div className={styles.column}>
          <div className={styles.logoContainer}>
            <Image src="/logo-footer.webp" alt="Youmei Store Logo" width={50} height={50} className={styles.logo} />
            <span className={styles.logoText}>YoumeiStore</span>
          </div>
          <p className={styles.text}>
            Somos Youmei Store, una tienda online especializada en equipos y accesorios para creadores de contenido. Te ofrecemos una amplia variedad de productos.
          </p>
        </div>

        {/* Col 2 */}
        <div className={styles.column}>
          <h4 className={styles.title} onClick={() => toggle('objetivo')}>
            OBJETIVO
            <span className={`${styles.chevron} ${openSection === 'objetivo' ? styles.open : ''}`}>⌄</span>
          </h4>
          <div className={`${styles.collapsibleContent} ${openSection === 'objetivo' ? styles.show : ''}`}>
            <p className={styles.text}>
              Brindar equipos y accesorios de audio y video innovadores, accesibles y confiables para creadores de contenido y público en general.
            </p>
          </div>
        </div>

        {/* Col 3 */}
        <div className={`${styles.column} ${styles.directory}`}>
          <h4 className={styles.title} onClick={() => toggle('directorio')}>
            DIRECTORIO
            <span className={`${styles.chevron} ${openSection === 'directorio' ? styles.open : ''}`}>⌄</span>
          </h4>
          <div className={`${styles.collapsibleContent} ${openSection === 'directorio' ? styles.show : ''}`}>
            <ul className={styles.links}>
              <li><Link href="/">INICIO</Link></li>
              <li><Link href="/productos">PRODUCTOS</Link></li>
              <li><Link href="/nosotros">NOSOTROS</Link></li>
              <li><Link href="/contacto">CONTACTO</Link></li>
            </ul>
          </div>
        </div>

        {/* Col 4 */}
        <div className={styles.column}>
          <h4 className={styles.title} onClick={() => toggle('politicas')}>
            POLÍTICAS Y PRIVACIDAD
            <span className={`${styles.chevron} ${openSection === 'politicas' ? styles.open : ''}`}>⌄</span>
          </h4>
          <div className={`${styles.collapsibleContent} ${openSection === 'politicas' ? styles.show : ''}`}>
            <p className={styles.text}>
              El presente informe establece los términos en los que Youmei Store usa y protege la información que es proporcionada por sus usuarios al momento de utilizar el sitio web. Estamos comprometidos con la seguridad de los datos de nuestros clientes.
            </p>
          </div>
        </div>
      </div>
      
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          Copyright &copy; {new Date().getFullYear()} - Youmei Store
        </p>
      </div>
    </footer>
  );
}
