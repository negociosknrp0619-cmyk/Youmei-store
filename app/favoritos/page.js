"use client";
import { useAuth } from '../../components/AuthProvider';
import Link from 'next/link';

export default function FavoritosPage() {
  const { user } = useAuth();

  return (
    <div className="container" style={{ paddingTop: '100px', minHeight: '60vh' }}>
      <h1 style={{ marginBottom: '2rem' }}>Mis Favoritos</h1>
      
      {!user ? (
        <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'var(--background)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
          <h2 style={{ marginBottom: '1rem' }}>Inicia sesión para ver tus favoritos</h2>
          <p style={{ color: '#888', marginBottom: '2rem' }}>Guarda los productos que más te gustan y encuéntralos aquí en cualquier momento.</p>
          <Link href="/login" style={{ padding: '10px 20px', backgroundColor: 'var(--foreground)', color: 'var(--background)', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
            Iniciar Sesión
          </Link>
        </div>
      ) : (
        <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'var(--background)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
          <h2 style={{ marginBottom: '1rem' }}>Aún no tienes productos favoritos</h2>
          <p style={{ color: '#888', marginBottom: '2rem' }}>Explora nuestra tienda y marca el corazón en los productos que te gusten.</p>
          <Link href="/productos" style={{ padding: '10px 20px', backgroundColor: 'var(--foreground)', color: 'var(--background)', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
            Explorar Productos
          </Link>
        </div>
      )}
    </div>
  );
}
