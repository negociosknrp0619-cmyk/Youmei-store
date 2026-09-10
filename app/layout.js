import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/CartProvider';
import { AuthProvider } from '@/components/AuthProvider';
import { FavoritesProvider } from '@/components/FavoritesProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/AnnouncementBar';
import WhatsAppButton from '@/components/WhatsAppButton';
import FloatingTestimonial from '@/components/FloatingTestimonial';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Youmei Store | Equipos para Creadores de Contenido',
  description: 'Tienda especializada en la venta de equipos electrónicos para creadores de contenido: micrófonos, estabilizadores, luces y más.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <FavoritesProvider>
            <CartProvider>
              <Navbar />
              <main style={{ minHeight: 'calc(100vh - 160px)' }}>
                {children}
              </main>
              <Footer />
              <WhatsAppButton />
              <FloatingTestimonial />
            </CartProvider>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
