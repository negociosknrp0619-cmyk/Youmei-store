"use client";
import { useState, useMemo, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../../components/ProductCard';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import styles from './page.module.css';

function ProductosContent() {
  const searchParams = useSearchParams();
  const initialBrand = searchParams.get('brand');
  const query = searchParams.get('q');
  const initialCategory = searchParams.get('category');

  const [selectedBrands, setSelectedBrands] = useState(initialBrand ? [initialBrand.toLowerCase()] : []);
  const [selectedCategories, setSelectedCategories] = useState(initialCategory ? [initialCategory.toLowerCase()] : []);
  const [sortOption, setSortOption] = useState('relevancia'); // relevancia, precio_asc, precio_desc
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snap = await getDocs(collection(db, 'products'));
        const prods = [];
        snap.forEach(doc => prods.push({ id: doc.id, ...doc.data() }));
        setAllProducts(prods);
      } catch (err) {
        console.error('Error fetching products', err);
        setFetchError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Sincronizar parámetros de la URL si cambian sin desmontar la página (ej. clics en Navbar)
  useEffect(() => {
    if (initialBrand) {
      setSelectedBrands([initialBrand.toLowerCase()]);
    } else {
      setSelectedBrands([]);
    }
    
    if (initialCategory) {
      setSelectedCategories([initialCategory.toLowerCase()]);
    } else {
      setSelectedCategories([]);
    }
  }, [initialBrand, initialCategory]);

  // Expandir / contraer filtros
  const [openFilters, setOpenFilters] = useState({
    precio: true,
    marca: true,
    categoria: false
  });

  useEffect(() => {
    if (window.innerWidth >= 950) {
      setOpenFilters(prev => ({ ...prev, categoria: true }));
    }
  }, []);

  const toggleFilter = (key) => setOpenFilters(prev => ({ ...prev, [key]: !prev[key] }));

  // Opciones de marca estáticas solicitadas por el usuario
  const brands = [
    "DJI",
    "Ulanzi",
    "Godox",
    "Hohem",
    "Hollyland",
    "SmallRig"
  ];

  // Opciones de categoría estáticas solicitadas por el usuario
  const categoriesList = [
    "Estabilizadores", 
    "Microfonos", 
    "Video",
    "Luces", 
    "Soporte", 
    "Accesorios"
  ];

  const toggleBrand = (b) => {
    const brandLower = b.toLowerCase();
    setSelectedBrands(prev => 
      prev.includes(brandLower) 
        ? prev.filter(x => x !== brandLower)
        : [...prev, brandLower]
    );
  };

  const toggleCategory = (c) => {
    const catLower = c.toLowerCase();
    setSelectedCategories(prev => 
      prev.includes(catLower) 
        ? prev.filter(x => x !== catLower)
        : [...prev, catLower]
    );
  };

  const filteredProducts = useMemo(() => {
    let prods = [...allProducts];

    // Búsqueda
    if (query) {
      const q = query.toLowerCase();
      prods = prods.filter(p => p.title.toLowerCase().includes(q) || (p.brand && p.brand.toLowerCase().includes(q)));
    }

    // Marcas
    if (selectedBrands.length > 0) {
      prods = prods.filter(p => {
        const b = (p.brand || '').toLowerCase();
        return selectedBrands.includes(b);
      });
    }

    // Categorías
    if (selectedCategories.length > 0) {
      prods = prods.filter(p => {
        let cat = p.category;
        if (!cat && p.image) {
          const parts = p.image.split('/');
          if (parts.length > 5) cat = parts[5];
        }
        let c = (cat || '').toLowerCase();
        
        // Mapear la categoría deducida para que coincida exactamente con las opciones del filtro
        if (c.includes('estabilizador')) c = 'estabilizadores';
        else if (c.includes('microfono') || c.includes('micrófono') || c.includes('audio')) c = 'microfonos';
        else if (c.includes('video') || p.title.toLowerCase().includes('osmo action') || p.title.toLowerCase().includes('osmo pocket')) c = 'video';
        
        return selectedCategories.includes(c);
      });
    }

    // Precios (Usando currentPrice o originalPrice)
    prods = prods.filter(p => {
      const pPrice = p.currentPrice || p.originalPrice || 0;
      return pPrice >= priceRange[0] && pPrice <= priceRange[1];
    });

    // Ordenar
    if (sortOption === 'precio_asc') {
      prods.sort((a, b) => (a.currentPrice || a.originalPrice || 0) - (b.currentPrice || b.originalPrice || 0));
    } else if (sortOption === 'precio_desc') {
      prods.sort((a, b) => (b.currentPrice || b.originalPrice || 0) - (a.currentPrice || a.originalPrice || 0));
    }

    return prods;
  }, [allProducts, query, selectedBrands, selectedCategories, priceRange, sortOption]);

  const breadcrumbText = query ? `Búsqueda: ${query}` : (initialBrand || 'Todos');

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <span>Inicio</span> / <span className={styles.activeBreadcrumb}>{breadcrumbText}</span>
      </div>
      
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Filtros</h3>
            
            <div className={styles.filterGroup}>
              <div className={styles.filterHeader} onClick={() => toggleFilter('precio')}>
                <h4>Precio</h4>
                <span className={styles.chevron}>{openFilters.precio ? '^' : 'v'}</span>
              </div>
              {openFilters.precio && (
                <div className={styles.filterBody}>
                  <input 
                    type="range" 
                    min="0" 
                    max="5000" 
                    value={priceRange[1]} 
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    style={{width: '100%'}}
                  />
                  <div className={styles.priceRange}>
                    <span>S/ 0</span>
                    <span>S/ {priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.filterGroup}>
              <div className={styles.filterHeader} onClick={() => toggleFilter('marca')}>
                <h4>Marca</h4>
                <span className={styles.chevron}>{openFilters.marca ? '^' : 'v'}</span>
              </div>
              {openFilters.marca && (
                <div className={styles.filterBody}>
                  {brands.map(b => {
                    if (!b) return null;
                    const isChecked = selectedBrands.includes(b.toLowerCase());
                    return (
                      <label key={b} style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer'}}>
                        <input 
                          type="checkbox" 
                          checked={isChecked}
                          onChange={() => toggleBrand(b)}
                          style={{accentColor: '#ff5722'}}
                        />
                        <span style={{fontSize: '0.9rem'}}>{b}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
            
            <div className={styles.filterGroup}>
              <div className={styles.filterHeader} onClick={() => toggleFilter('categoria')}>
                <h4>Categoría</h4>
                <span className={styles.chevron}>{openFilters.categoria ? '^' : 'v'}</span>
              </div>
              {openFilters.categoria && (
                <div className={styles.filterBody}>
                  {categoriesList.map(c => {
                    if (!c) return null;
                    const isChecked = selectedCategories.includes(c.toLowerCase());
                    return (
                      <label key={c} style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer'}}>
                        <input 
                          type="checkbox" 
                          checked={isChecked}
                          onChange={() => toggleCategory(c)}
                          style={{accentColor: '#ff5722'}}
                        />
                        <span style={{fontSize: '0.9rem'}}>{c}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        </aside>
        
        <main className={styles.mainContent}>
          <div className={styles.topBar}>
            <span className={styles.resultsCount}>
              {filteredProducts.length} resultados
            </span>
            <select 
              className={styles.sortDropdown} 
              value={sortOption} 
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="relevancia">Ordenar por Relevancia</option>
              <option value="precio_asc">Menor precio</option>
              <option value="precio_desc">Mayor precio</option>
            </select>
          </div>

          <div className={styles.grid}>
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={`skel-${i}`} style={{ 
                  height: '380px', 
                  backgroundColor: 'var(--border-color)', 
                  borderRadius: '8px', 
                  animation: 'pulse 1.5s infinite ease-in-out' 
                }}></div>
              ))
            ) : (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
          
          {!loading && filteredProducts.length === 0 && (
            <div style={{padding: '3rem', textAlign: 'center', color: '#888'}}>
              No se encontraron productos con estos filtros.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ProductosPage() {
  return (
    <Suspense fallback={<div style={{padding: '120px 2rem', color: '#fff'}}>Cargando...</div>}>
      <ProductosContent />
    </Suspense>
  );
}
