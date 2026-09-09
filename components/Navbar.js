"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from './CartProvider';
import { categories } from '@/data/products';
import { dummyProducts } from '@/data/dummyProducts';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { cart } = useCart();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Búsqueda
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchRef = useRef(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevenir scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.navbar}`}>
          
          {/* Izquierda: Logo */}
          <Link href="/" className={styles.logoContainer}>
            <Image 
              src="/logo.png" 
              alt="Youmei Store Logo" 
              width={42}
              height={42}
              className={styles.logoImage}
              priority
            />
            <span className={styles.logoText}>Youmei Store</span>
          </Link>

          {/* Centro: Enlaces de Navegación (Desktop) */}
          <nav className={styles.navLinks}>
            <Link href="/" className={`${styles.navItem} ${pathname === '/' ? styles.active : ''}`}>INICIO</Link>
            
            <div className={styles.navDropdownWrapper}>
              <Link href="/productos" className={`${styles.navItem} ${pathname === '/productos' ? styles.active : ''}`}>
                PRODUCTOS <span className={styles.dropdownIcon}>▼</span>
              </Link>
              <div className={styles.dropdownMenu}>
                {categories.map(cat => (
                  <Link key={cat.id} href={`/productos?brand=${cat.id}`} className={styles.dropdownItem}>
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/nosotros" className={`${styles.navItem} ${pathname === '/nosotros' ? styles.active : ''}`}>NOSOTROS</Link>
            <Link href="/contacto" className={`${styles.navItem} ${pathname === '/contacto' ? styles.active : ''}`}>CONTACTO</Link>
          </nav>

          {/* Derecha: Iconos y Menú Móvil */}
          <div className={styles.rightIcons}>
            
            <div className={styles.searchBarContainer} ref={searchRef}>
              <form onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  setShowSuggestions(false);
                  router.push(`/productos?q=${encodeURIComponent(searchQuery)}`);
                }
              }} style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <input 
                  type="text" 
                  placeholder="Buscar productos..." 
                  className={styles.searchInput} 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                />
                <button type="submit" className={styles.searchBtn} aria-label="Buscar">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                </button>
              </form>

              {/* Sugerencias de búsqueda */}
              {showSuggestions && searchQuery.trim() !== '' && (
                <div className={styles.searchDropdown}>
                  {dummyProducts
                    .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase()))
                    .slice(0, 5)
                    .map(p => (
                      <Link 
                        key={p.id} 
                        href={`/productos/${p.id}`} 
                        className={styles.searchItem}
                        onClick={() => setShowSuggestions(false)}
                      >
                        {p.image && (
                          <img src={p.image} alt={p.title} className={styles.searchItemImage} />
                        )}
                        <div className={styles.searchItemInfo}>
                          <span className={styles.searchItemTitle}>{p.title}</span>
                          <span className={styles.searchItemPrice}>
                            S/ {(p.currentPrice || p.originalPrice || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </Link>
                    ))}
                  {dummyProducts.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                    <div className={styles.searchItem} style={{ padding: '15px', color: '#888' }}>
                      No se encontraron resultados
                    </div>
                  )}
                </div>
              )}
            </div>

            <button 
              className={`${styles.iconBtn} ${styles.mobileSearchBtn}`} 
              aria-label="Buscar móvil"
              onClick={() => {
                setMobileSearchOpen(!mobileSearchOpen);
                // Si se abre, enfocar el input después de renderizar (opcional)
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </button>
            
            <Link href="/cart" className={styles.cartIconWrapper} aria-label="Carrito">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
            </Link>
            
            <div className={styles.socialIcons}>
              <a href="https://www.facebook.com/youmeiperu" target="_blank" rel="noopener noreferrer" className={styles.socialCircle} aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@youmei.store.peru" target="_blank" rel="noopener noreferrer" className={styles.socialCircle} aria-label="TikTok">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
              </a>
              <a href="https://www.instagram.com/youmeitec/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer" className={styles.socialCircle} aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://wa.me/51983725740" target="_blank" rel="noopener noreferrer" className={styles.socialCircle} aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </a>
            </div>

            <Link href="/login" className={`${styles.iconBtn} ${styles.profileBtn}`} aria-label="Perfil">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </Link>

            {/* Hamburger Button (Mobile only) */}
            <button 
              className={styles.hamburgerBtn} 
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menú"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile Search Bar Overlay (Inside header so top: 100% works relative to header) */}
        {mobileSearchOpen && (
          <div className={styles.mobileSearchOverlay}>
            <form className={styles.mobileSearchForm} onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                setShowSuggestions(false);
                setMobileSearchOpen(false);
                router.push(`/productos?q=${encodeURIComponent(searchQuery)}`);
              }
            }}>
              <button type="submit" className={styles.mobileSearchSubmitBtn}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              </button>
              <input 
                type="text" 
                placeholder="¿Qué estás buscando?" 
                className={styles.mobileSearchInput} 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                autoFocus
              />
            </form>
          </div>
        )}
      </header>

      {/* Menú Móvil (Drawer) */}
      {mobileMenuOpen && (
        <div className={styles.mobileOverlay} onClick={() => setMobileMenuOpen(false)}>
          <div className={styles.mobileDrawer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.drawerHeader}>
              <button className={styles.closeBtn} onClick={() => setMobileMenuOpen(false)} aria-label="Cerrar menú">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <nav className={styles.drawerLinks}>
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className={styles.drawerItem}>Inicio</Link>
              <Link href="/productos" onClick={() => setMobileMenuOpen(false)} className={styles.drawerItem}>Productos</Link>
              <Link href="/nosotros" onClick={() => setMobileMenuOpen(false)} className={styles.drawerItem}>Nosotros</Link>
              <Link href="/contacto" onClick={() => setMobileMenuOpen(false)} className={styles.drawerItem}>Contáctanos</Link>
            </nav>

            <div className={styles.drawerSocials}>
              <a href="https://www.facebook.com/youmeiperu" target="_blank" rel="noopener noreferrer" className={styles.drawerSocialCircle} aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@youmei.store.peru" target="_blank" rel="noopener noreferrer" className={styles.drawerSocialCircle} aria-label="TikTok">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
              </a>
              <a href="https://www.instagram.com/youmeitec/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer" className={styles.drawerSocialCircle} aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
