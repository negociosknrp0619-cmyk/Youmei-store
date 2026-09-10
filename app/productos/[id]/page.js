"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { db } from '../../../lib/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import ProductCard from '../../../components/ProductCard';
import { useCart } from '../../../components/CartProvider';
import { WHATSAPP_NUMBER } from '../../../data/products';
import styles from './page.module.css';

// Avoid double-encoding: if the URL already has %XX sequences, don't re-encode
function safeEncodeURI(url) {
  if (!url) return '';
  // If already encoded (contains %20, %2F, etc.), return as-is
  if (/%[0-9A-Fa-f]{2}/.test(url)) return url;
  return encodeURI(url);
}

export default function ProductPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isAddingSticky, setIsAddingSticky] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: 'center center', transform: 'scale(1)' });
  const [activeTab, setActiveTab] = useState('detalles');
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [faqsExpanded, setFaqsExpanded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showMaxWarning, setShowMaxWarning] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const snap = await getDocs(collection(db, 'products'));
        const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setRelatedProducts(all.filter(p => p.id !== id).slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    };
    fetchRelated();
  }, [id]);

  const images = product?.images || (product?.image ? [product.image] : []);
  const currentImage = images[activeImageIndex] || '';
  const visibleThumbnailsCount = 3;

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(2.5)'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: 'center center',
      transform: 'scale(1)'
    });
  };

  const handleIncreaseQty = () => {
    if (quantity < 3) {
      setQuantity(q => q + 1);
      setShowMaxWarning(false);
    } else {
      setShowMaxWarning(true);
      setTimeout(() => setShowMaxWarning(false), 3000);
    }
  };

  const handleNextThumbs = () => {
    if (thumbnailStartIndex + visibleThumbnailsCount < images.length) {
      setThumbnailStartIndex(prev => prev + 1);
    }
  };

  const handlePrevThumbs = () => {
    if (thumbnailStartIndex > 0) {
      setThumbnailStartIndex(prev => prev - 1);
    }
  };

  if (loading) return <div style={{padding: '5rem', textAlign: 'center'}}>Cargando producto...</div>;
  if (!product) return <div style={{padding: '5rem', textAlign: 'center'}}>Producto no encontrado</div>;

  const hasMoreAbove = thumbnailStartIndex > 0;
  const hasMoreBelow = thumbnailStartIndex + visibleThumbnailsCount < images.length;
  
  let thumbnailsMaskClass = '';
  if (hasMoreAbove && hasMoreBelow) thumbnailsMaskClass = styles.maskBoth;
  else if (hasMoreAbove) thumbnailsMaskClass = styles.maskTop;
  else if (hasMoreBelow) thumbnailsMaskClass = styles.maskBottom;

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link href="/">Inicio</Link> / <Link href="/productos">Productos</Link> / <span className={styles.activeBreadcrumb}>{product.title}</span>
      </div>

      <div className={styles.productLayout}>
        {/* Left Column: Gallery */}
        <div className={styles.galleryColumn}>
          <div className={styles.thumbnailsContainer}>
            {hasMoreAbove && (
              <button className={styles.thumbNavBtn} onClick={handlePrevThumbs}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"></polyline></svg>
              </button>
            )}
            
            <div 
              className={`${styles.thumbnails} ${thumbnailsMaskClass}`}
              style={{ '--thumb-index': thumbnailStartIndex }}
            >
              <div className={styles.thumbnailsTrack}>
                {images.map((img, idx) => {
                  return (
                    <div 
                      key={idx} 
                      className={`${styles.thumbnail} ${activeImageIndex === idx ? styles.activeThumbnail : ''}`}
                      onClick={() => setActiveImageIndex(idx)}
                    >
                      <Image src={safeEncodeURI(img)} alt={`thumb-${idx}`} fill style={{ objectFit: 'contain', padding: '4px' }} unoptimized />
                    </div>
                  );
                })}
              </div>
            </div>

            {hasMoreBelow && (
              <button className={styles.thumbNavBtn} onClick={handleNextThumbs}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
            )}
          </div>
          <div 
            className={styles.mainImageWrapper}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              className={styles.heartIcon}
              onMouseEnter={handleMouseLeave}
              onMouseMove={(e) => e.stopPropagation()}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </div>
            <div 
              className={styles.navArrowLeft} 
              onMouseEnter={handleMouseLeave}
              onMouseMove={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1)); }}
            >
              &lt;
            </div>
            <div className={styles.imageZoomContainer} style={zoomStyle}>
              <Image src={safeEncodeURI(currentImage)} alt={product.title} fill style={{ objectFit: 'contain', padding: '2rem' }} unoptimized />
            </div>
            <div 
              className={styles.navArrowRight} 
              onMouseEnter={handleMouseLeave}
              onMouseMove={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0)); }}
            >
              &gt;
            </div>
            
            <div className={styles.mobilePagination}>
              {images.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`${styles.dot} ${activeImageIndex === idx ? styles.activeDot : ''}`} 
                  onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column: Info */}
        <div className={styles.infoColumn}>
          <p className={styles.sku}>SKU: {product.sku}</p>
          <h1 className={styles.title}>{product.title}</h1>
          
          <div className={styles.ratingRow}>
            <span className={styles.stars}>★★★★★</span>
            {product.ratingScore && <span className={styles.ratingScore}>{product.ratingScore}</span>}
            <span className={styles.ratingCount}>({product.reviewCount || 0})</span>
            <a href="#reviews" className={styles.reviewLink}>Inicia sesión para dejar tu reseña.</a>
          </div>

          <div className={styles.priceSection}>
            {product.originalPrice && (
              <div className={styles.originalPrice}>S/ {product.originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            )}
            <div className={styles.currentPriceRow}>
              <span className={styles.currentPrice}>S/ {product.currentPrice?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              {product.discountBadge && (
                <span className={styles.discountBadge}>{product.discountBadge}</span>
              )}
            </div>
            {product.purchasedThisMonth && (
              <p className={styles.purchasedText}>+{product.purchasedThisMonth} comprados este mes</p>
            )}
          </div>

          <div className={styles.aboutSection}>
            <h3>Acerca del producto</h3>
            <ul>
              {product.about?.map((item, index) => (
                <li key={index}><strong>{item.label}:</strong> {item.value}</li>
              ))}
            </ul>
            <button onClick={() => { setActiveTab('especificaciones'); document.getElementById('detalles').scrollIntoView({ behavior: 'smooth' }); }} className={styles.seeAllLink} style={{background: 'none', border: 'none', cursor: 'pointer', padding: 0}}>Ver todas las especificaciones</button>
          </div>
        </div>

        {/* Right Column: Buy Box */}
        <div className={styles.buyColumn}>
          <div className={styles.buyBox}>
            <h3 className={styles.buyBoxTitle}>Compra segura</h3>
            <ul className={styles.trustList}>
              <li>
                <span className={styles.trustIcon}>🚚</span>
                Envío <span className={styles.freeBadge}>GRATIS</span> a partir del 2do producto
              </li>
              <li>
                <span className={styles.trustIcon}>🔄</span>
                Fácil devolución
              </li>
              <li>
                <span className={styles.trustIcon}>🛡️</span>
                Garantía por la tienda
              </li>
            </ul>
            <Link href="/terminos" className={styles.termsLink}>Aplica términos y condiciones</Link>

            <div className={styles.quantitySection}>
              <label>Cantidad</label>
              <div className={styles.quantityWrapper}>
                <div className={styles.quantitySelector}>
                  <button 
                    onClick={() => { setQuantity(q => Math.max(1, q - 1)); setShowMaxWarning(false); }}
                    className={styles.qtyBtn}
                  >-</button>
                  <span className={styles.qtyValue}>{quantity}</span>
                  <button 
                    onClick={handleIncreaseQty}
                    className={styles.qtyBtn}
                  >+</button>
                </div>
                {showMaxWarning && <span className={styles.maxWarningText}>Límite alcanzado</span>}
              </div>
              <p className={styles.wholesaleNotice}>Máx. 3 por producto. Para compras por mayor, contáctanos por WhatsApp.</p>
            </div>

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
                }, quantity);
                setTimeout(() => {
                  setIsAdding(false);
                }, 800);
              }}
              disabled={isAdding}
            >
              {isAdding ? <span className={styles.spinner}></span> : 'Añadir al carrito'}
            </button>
            <button 
              className={styles.whatsappBtn}
              onClick={() => {
                const price = product.currentPrice || product.price || product.originalPrice || 0;
                let message = `Hola Youmei Store, quiero comprar el siguiente producto:\n\n`;
                message += `- ${quantity}x ${product.title} (S/ ${price.toFixed(2)} c/u)\n`;
                message += `\n*Total:* S/ ${(price * quantity).toFixed(2)}\n`;
                const encodedMessage = encodeURIComponent(message);
                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
              }}
            >
              <span className={styles.waIcon}>💬</span> Comprar por WhatsApp
            </button>

          </div>
        </div>
      </div>

      {/* Detalles y Especificaciones Técnicas */}
      <div id="detalles" className={styles.bottomSection}>
        <div className={styles.tabsContainer}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'detalles' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('detalles')}
          >
            Detalles
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'especificaciones' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('especificaciones')}
          >
            Especificaciones
          </button>
          {product.faqs && product.faqs.length > 0 && (
            <button 
              className={`${styles.tabBtn} ${activeTab === 'faqs' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('faqs')}
            >
              Preguntas Frecuentes
            </button>
          )}
        </div>
        
        <div className={styles.tabContent}>
          {activeTab === 'detalles' && (
            <div className={styles.detailsTabWrapper}>
              <h2 className={styles.detailsMainHeading}>{product.detailsHeading || product.title}</h2>
              
              <div className={`${styles.detailsTextContainer} ${detailsExpanded ? styles.expanded : ''}`}>
                <p className={styles.detailsParagraph}>{product.detailsText}</p>
                
                {product.features && product.features.length > 0 && (
                  <>
                    <h3 className={styles.sectionSubtitle}>CARACTERÍSTICAS PRINCIPALES</h3>
                    <div className={styles.featureGrid}>
                      {product.features.map((feature, idx) => (
                        <div key={idx} className={styles.featureItem}>
                          <h4>{feature.title}</h4>
                          <p>{feature.desc}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {!detailsExpanded && <div className={styles.detailsFadeOut}></div>}
              </div>
              
              <div className={styles.verMasWrapper}>
                <button 
                  className={styles.verMasBtn} 
                  onClick={() => setDetailsExpanded(!detailsExpanded)}
                >
                  {detailsExpanded ? 'Ver menos ⌃' : 'Ver más ⌄'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'especificaciones' && (
            <div className={styles.specsTabWrapper}>
              <table className={styles.specsTable}>
                <tbody>
                  {product.specs?.map((spec, idx) => (
                    <tr key={idx}>
                      <th>{spec.label}</th>
                      <td>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className={styles.faqsTabWrapper}>
              {product.faqs?.slice(0, faqsExpanded ? product.faqs.length : 3).map((faq, idx) => (
                <div key={idx} className={styles.faqItem}>
                  <h4>{faq.q}</h4>
                  <p>{faq.a}</p>
                </div>
              ))}
              
              {product.faqs && product.faqs.length > 3 && (
                <div className={styles.verMasWrapper}>
                  <button 
                    className={styles.verMasBtn} 
                    onClick={() => setFaqsExpanded(!faqsExpanded)}
                  >
                    {faqsExpanded ? 'Ver menos ⌃' : 'Ver más ⌄'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Productos Similares */}
      <div className={styles.similarProductsSection}>
        <h2 className={styles.similarProductsTitle}>También te puede interesar</h2>
        <div className={styles.similarProductsGrid}>
          {relatedProducts.map(similarProduct => (
              <ProductCard key={similarProduct.id} product={similarProduct} />
            ))}
        </div>
      </div>

      {/* Mobile Sticky Buy Bar */}
      <div className={styles.mobileStickyBar}>
        <div className={styles.stickyQuantity}>
          <button onClick={() => { setQuantity(q => Math.max(1, q - 1)); setShowMaxWarning(false); }}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncreaseQty}>+</button>
        </div>
        <button 
          className={`${styles.stickyAddToCartBtn} ${isAddingSticky ? styles.adding : ''}`}
          onClick={() => {
            if (isAddingSticky) return;
            setIsAddingSticky(true);
            addToCart({
              id: product.id,
              name: product.title,
              price: product.currentPrice || product.price || product.originalPrice || 0,
              image: product.image
            }, quantity);
            setTimeout(() => {
              setIsAddingSticky(false);
            }, 800);
          }}
          disabled={isAddingSticky}
        >
          {isAddingSticky ? (
            <span className={styles.spinner}></span>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Añadir al carrito
            </>
          )}
        </button>
      </div>
    </div>
  );
}
