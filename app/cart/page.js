"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/CartProvider';
import { WHATSAPP_NUMBER } from '@/data/products';
import styles from './cart.module.css';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [formData, setFormData] = useState({ name: '', address: '' });
  
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert("Por favor ingresa tu nombre");
      return;
    }

    let message = `Hola Youmei Store, quiero realizar el siguiente pedido:\n\n`;
    message += `*Cliente:* ${formData.name}\n`;
    if (formData.address) message += `*Dirección:* ${formData.address}\n`;
    message += `\n*Detalles del Pedido:*\n`;
    
    cart.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (S/ ${item.price.toFixed(2)} c/u)\n`;
    });
    
    message += `\n*Total:* S/ ${total.toFixed(2)}\n`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
    clearCart();
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={`container ${styles.cartContainer}`}>
      <div className={styles.cartHeader}>
        <h1>Carrito <span className={styles.cartCount}>({totalItems} {totalItems === 1 ? 'producto' : 'productos'})</span></h1>
        {cart.length > 0 && (
          <button className={styles.clearCartBtn} onClick={clearCart}>Vaciar carrito</button>
        )}
      </div>
      
      {cart.length === 0 ? (
        <div className={styles.empty}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={styles.emptyIcon}>
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <h2>Tu carrito está vacío</h2>
          <p>Aún no has agregado ningún producto a tu carrito.</p>
          <a href="/productos" className={`btn-primary ${styles.continueBtn}`}>Seguir comprando</a>
        </div>
      ) : (
        <div className={styles.cartLayout}>
          
          {/* Columna Izquierda: Lista de productos */}
          <div className={styles.itemsColumn}>
            <div className={styles.itemsCard}>
              {cart.map(item => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <Image src={item.image} alt={item.name} fill sizes="100px" style={{ objectFit: 'contain' }} />
                  </div>
                  <div className={styles.itemInfoGroup}>
                    <div className={styles.itemDetails}>
                      {/* En tu estructura de datos podrías tener categoría, si no, se puede omitir o poner 'Tecnología' */}
                      <span className={styles.itemCategory}>Producto</span> 
                      <h3>{item.name}</h3>
                      <p className={styles.unitPrice}>S/ {item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                    </div>
                    
                    <div className={styles.itemActionsGroup}>
                      <div className={styles.quantityPill}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{ opacity: item.quantity >= 3 ? 0.3 : 1, cursor: item.quantity >= 3 ? 'not-allowed' : 'pointer' }}
                          disabled={item.quantity >= 3}
                        >
                          +
                        </button>
                      </div>
                      
                      <div className={styles.itemTotalPrice}>
                        S/ {(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                      
                      <button className={styles.removeIconBtn} onClick={() => removeFromCart(item.id)} aria-label="Eliminar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Columna Derecha: Resumen */}
          <div className={styles.summaryColumn}>
            
            {/* Tarjeta Resumen */}
            <div className={styles.summaryCard}>
              <h2>Resumen del pedido</h2>
              
              <div className={styles.summaryRow}>
                <span>Subtotal ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})</span>
                <span>S/ {total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              
              <div className={styles.summaryRow}>
                <span>Envío</span>
                <span style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>Por definir</span>
              </div>
              
              <div className={styles.summaryDivider}></div>
              
              <div className={styles.totalRow}>
                <span>Total</span>
                <span>S/ {total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>

              <Link href="/checkout" className={styles.checkoutBtn}>
                Proceder al registro <span style={{marginLeft: '8px'}}>→</span>
              </Link>
              
              <Link href="/productos" className={styles.keepShoppingLink}>Seguir comprando</Link>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
