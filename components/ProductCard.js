"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from './CartProvider';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  return (
    <div className={styles.card}>
      <Link href={`/productos/${product.id}`} className={styles.imageLink}>
        <div className={styles.imageWrapper}>
          <Image
            src={product.image}
            alt={product.title}
            fill
            style={{ objectFit: 'contain', padding: '1rem' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            unoptimized={true}
          />
        </div>
      </Link>
      
      <div className={styles.info}>
        <h3 className={styles.title}>
          <Link href={`/productos/${product.id}`}>{product.title}</Link>
        </h3>
        
        <div className={styles.priceContainer}>
          {product?.originalPrice && (
            <div className={styles.originalPriceRow}>
              <span className={styles.originalPrice}>
                S/ {product.originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              {product?.discountBadge && (
                <span className={styles.discountBadge}>{product.discountBadge}</span>
              )}
            </div>
          )}
          <div className={styles.currentPrice}>
            S/ {(product?.currentPrice || product?.price) ? (product.currentPrice || product.price).toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'}
          </div>
        </div>

        <div className={styles.actions}>
          <button 
            className={`${styles.addToCartBtn} ${isAdding ? styles.adding : ''}`}
            onClick={() => {
              if (isAdding) return;
              setIsAdding(true);
              addToCart({
                id: product.id,
                name: product.title,
                price: product.currentPrice || product.price || product.originalPrice || 0,
                image: product.image
              });
              setTimeout(() => {
                setIsAdding(false);
              }, 800);
            }}
            disabled={isAdding}
          >
            {isAdding ? (
              <span className={styles.spinner}></span>
            ) : (
              'Añadir al carrito'
            )}
          </button>
          <button className={styles.favoriteBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
