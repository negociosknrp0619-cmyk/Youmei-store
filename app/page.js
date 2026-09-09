import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import FavoriteCategories from '@/components/FavoriteCategories';
import ProductCard from '@/components/ProductCard';
import HeroCarousel from '@/components/HeroCarousel';
import AnnouncementBar from '@/components/AnnouncementBar';
import BrandCarousel from '@/components/BrandCarousel';
import FeaturesBar from '@/components/FeaturesBar';
import Testimonials from '@/components/Testimonials';
import styles from './page.module.css';

// Hacemos que Next.js regenere la página cada hora (opcional) o cada request
export const revalidate = 60; // 60 segundos

export default async function Home() {
  const featuredIds = [
    'dji-mic-mini-2s', 
    'dji-osmo-mobile-8p-creator', 
    'dji-rs-5-combo', 
    'dji-osmo-action-6-standar-combo'
  ];

  let featuredProducts = [];
  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('id', 'in', featuredIds));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
      featuredProducts.push({ id: doc.id, ...doc.data() });
    });
  } catch (error) {
    console.error("Error fetching featured products:", error);
  }

  return (
    <div>
      <HeroCarousel />
      <AnnouncementBar />

      {/* Categorías Favoritas (Diseño circular) */}
      <FavoriteCategories />

      <BrandCarousel />

      {/* Featured Products */}
      <section id="featured" className={`container ${styles.section}`}>
        <h2>Productos Destacados</h2>
        <div className="grid-4">
          {featuredProducts.length > 0 ? (
            featuredProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))
          ) : (
            <p>Cargando productos destacados...</p>
          )}
        </div>
      </section>

      <FeaturesBar />
      <Testimonials />
    </div>
  );
}
