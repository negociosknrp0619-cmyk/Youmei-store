"use client";
import Link from 'next/link';
import { products } from '@/data/products';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useCart } from '@/components/CartProvider';
import ProductCard from '@/components/ProductCard';
import styles from './product.module.css';

export default function ProductDetailPage({ params }) {
  const { id } = params;
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();

  if (!product) {
    notFound();
  }

  // Get related products from the same category (excluding current one)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product);
    alert('Producto añadido al carrito');
  };

  return (
    <div className={`container ${styles.productPageWrapper}`}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href="/">Inicio</Link> <span>/</span> 
        <Link href="/productos">Productos</Link> <span>/</span> 
        <Link href={`/productos?brand=${product.category}`} className={styles.brandCrumb}>
          {product.category.toUpperCase()}
        </Link> <span>/</span> 
        <span className={styles.currentCrumb}>{product.name}</span>
      </nav>

      <div className={styles.productLayout}>
        <div className={styles.imageSection}>
          <div className={styles.mainImage}>
            <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }} 
              priority
            />
          </div>
        </div>
        
        <div className={styles.detailsSection}>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.price}>S/ {product.price.toFixed(2)}</p>
          
          <div className={styles.description}>
            <p>{product.description}</p>
          </div>

          <div className={styles.featuresList}>
            <h3>Características Principales:</h3>
            <ul>
              <li>✔️ Producto Original Garantizado</li>
              <li>✔️ Asesoría experta post-venta</li>
              <li>✔️ Stock disponible para envío inmediato</li>
            </ul>
          </div>
          
          <button className={`btn-primary ${styles.addToCartBtn}`} onClick={handleAddToCart}>
            Añadir al carrito 🛒
          </button>

          <div className={styles.trustBadges}>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>🚚</span>
              <span className={styles.badgeText}>Envío a todo el Perú</span>
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>🛡️</span>
              <span className={styles.badgeText}>Garantía de 1 año</span>
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>🔒</span>
              <span className={styles.badgeText}>Pago 100% Seguro</span>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>PRODUCTOS RELACIONADOS</h2>
          <div className={styles.relatedGrid}>
            {relatedProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
