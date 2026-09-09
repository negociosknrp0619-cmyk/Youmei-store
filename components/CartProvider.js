'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('youmei-cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        const clamped = parsed.map(item => ({ ...item, quantity: Math.min(item.quantity, 3) }));
        setCart(clamped);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('youmei-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, qtyToAdd = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + qtyToAdd, 3);
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      return [...prev, { ...product, quantity: Math.min(qtyToAdd, 3) }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    const cappedQty = Math.min(quantity, 3);
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: cappedQty } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
