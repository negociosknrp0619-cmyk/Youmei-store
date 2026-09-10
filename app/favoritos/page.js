"use client";
import { useAuth } from '../../components/AuthProvider';
import { useFavorites } from '../../components/FavoritesProvider';
import Link from 'next/link';
import Image from 'next/image';

export default function FavoritosPage() {
  const { user } = useAuth();
  const { favorites, toggleFavorite, loading } = useFavorites();

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '100px', minHeight: '60vh', textAlign: 'center' }}>
        <h2>Cargando favoritos...</h2>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '100px', minHeight: '60vh' }}>
      <h1 style={{ marginBottom: '2rem' }}>Mis Favoritos</h1>
      
      {!user && favorites.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'var(--background)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
          <h2 style={{ marginBottom: '1rem' }}>Inicia sesión para guardar permanentemente</h2>
          <p style={{ color: '#888', marginBottom: '2rem' }}>Tus favoritos actuales solo se guardan en este dispositivo. Inicia sesión para sincronizarlos.</p>
          <Link href="/login" style={{ padding: '10px 20px', backgroundColor: 'var(--foreground)', color: 'var(--background)', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
            Iniciar Sesión
          </Link>
        </div>
      ) : favorites.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'var(--background)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
          <h2 style={{ marginBottom: '1rem' }}>Aún no tienes productos favoritos</h2>
          <p style={{ color: '#888', marginBottom: '2rem' }}>Explora nuestra tienda y marca el corazón en los productos que te gusten.</p>
          <Link href="/productos" style={{ padding: '10px 20px', backgroundColor: 'var(--foreground)', color: 'var(--background)', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
            Explorar Productos
          </Link>
        </div>
      ) : (
        <>
          {!user && (
            <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#fff3cd', color: '#856404', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Inicia sesión para no perder tus favoritos y verlos desde cualquier dispositivo.</span>
              <Link href="/login" style={{ fontWeight: 'bold', color: '#856404', textDecoration: 'underline' }}>Iniciar Sesión</Link>
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {favorites.map(prod => (
              <div key={prod.id} style={{ border: '1px solid var(--border-color)', borderRadius: '12px', padding: '15px', position: 'relative', backgroundColor: 'var(--background)' }}>
                <button 
                  onClick={() => toggleFavorite(prod)}
                  style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: '#e91e63', cursor: 'pointer', zIndex: 10 }}
                  aria-label="Quitar de favoritos"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#e91e63" stroke="#e91e63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <Link href={`/productos/${prod.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', textAlign: 'center' }}>
                  <div style={{ position: 'relative', width: '100%', height: '150px', marginBottom: '10px' }}>
                    <Image src={prod.image} alt={prod.title} fill style={{ objectFit: 'contain' }} unoptimized={true} />
                  </div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '8px', height: '40px', overflow: 'hidden' }}>{prod.title}</h3>
                  <div style={{ fontWeight: 'bold', color: '#f36c21' }}>S/ {prod.price?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
