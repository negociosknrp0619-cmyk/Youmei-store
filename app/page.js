import Link from 'next/link';
import Image from 'next/image';
import { dummyProducts } from '@/data/dummyProducts';
import { categories } from '@/data/products';
import FavoriteCategories from '@/components/FavoriteCategories';
import ProductCard from '@/components/ProductCard';
import HeroCarousel from '@/components/HeroCarousel';
import AnnouncementBar from '@/components/AnnouncementBar';
import BrandCarousel from '@/components/BrandCarousel';
import FeaturesBar from '@/components/FeaturesBar';
import Testimonials from '@/components/Testimonials';
import styles from './page.module.css';

export default function Home() {
  // Let's grab some real products we added for the featured section
  const featuredIds = [
    'dji-mic-mini-2s', 
    'dji-osmo-mobile-8p-creator', 
    'dji-rs-5-combo', 
    'dji-osmo-action-6-standar-combo'
  ];
  const featuredProducts = dummyProducts.filter(p => featuredIds.includes(p.id));

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
          {featuredProducts.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      <FeaturesBar />
      <Testimonials />
    </div>
  );
}
