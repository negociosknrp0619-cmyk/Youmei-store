import Image from 'next/image';
import Link from 'next/link';
import FeaturesBar from '@/components/FeaturesBar';
import styles from './nosotros.module.css';

export const metadata = {
  title: 'Nosotros | Youmei Store',
  description: 'Conoce más sobre Youmei Store, tu tienda especializada en equipos audiovisuales.',
};

export default function NosotrosPage() {
  return (
    <div className={styles.pageContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.heroTitle}>Sobre Nosotros</h1>
          <p className={styles.heroSubtitle}>"Lo único que sobrevive al tiempo es lo que decides capturar."</p>
        </div>
      </section>

      {/* Quienes Somos */}
      <section className={`container ${styles.aboutSection}`}>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutText}>
            <h2 className={styles.sectionTitle}>¿Quiénes Somos?</h2>
            <div className={styles.underline}></div>
            <p>
              En <strong>Youmei Store</strong> somos unos apasionados por la tecnología y la creación de contenido. 
              Nacimos con la idea de brindar a fotógrafos, cineastas, vloggers y streamers las mejores 
              herramientas del mercado a precios justos y competitivos.
            </p>
            <p>
              Sabemos que el equipo adecuado puede marcar la diferencia entre un buen proyecto y uno 
              excepcional. Por eso, nuestro catálogo cuenta con marcas líderes mundiales como DJI, 
              Hollyland, Sony, entre otras, garantizando calidad en cada toma y grabación.
            </p>
          </div>
          <div className={styles.aboutImageContainer}>
            <Image 
              src="/logo.png" 
              alt="Logo Youmei Store" 
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </section>

      {/* Mision y Vision */}
      <section className={styles.missionVisionSection}>
        <div className={`container ${styles.mvGrid}`}>
          <div className={styles.mvCard}>
            <div className={styles.mvIcon}>🎯</div>
            <h3>Nuestra Misión</h3>
            <p>
              Equipar a los creadores con la mejor tecnología, brindando una asesoría experta y 
              un servicio al cliente inigualable para que puedan llevar sus ideas y proyectos 
              audiovisuales a la realidad sin limitaciones.
            </p>
          </div>
          <div className={styles.mvCard}>
            <div className={styles.mvIcon}>👁️</div>
            <h3>Nuestra Visión</h3>
            <p>
              Ser la tienda líder en equipos de fotografía, video y audio en todo el Perú, 
              reconocida por la excelencia de nuestros productos, nuestra innovación constante 
              y la confianza depositada por nuestros clientes.
            </p>
          </div>
        </div>
      </section>

      {/* Beneficios (Reutilizado) */}
      <section className={styles.whyUsSection}>
        <div className="container">
          <h2 className={styles.sectionTitleCenter}>¿Por qué elegirnos?</h2>
          <div className={styles.underlineCenter}></div>
        </div>
        <FeaturesBar />
      </section>
      
      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={`container ${styles.ctaContent}`}>
          <h2>¿Listo para elevar la calidad de tus producciones?</h2>
          <p>Explora nuestro catálogo y descubre el equipo perfecto para ti.</p>
          <Link href="/productos" className="btn-primary">
            Ver Productos
          </Link>
        </div>
      </section>
    </div>
  );
}
