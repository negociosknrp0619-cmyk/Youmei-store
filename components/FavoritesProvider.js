"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar favoritos al inicio o cuando el usuario cambia
  useEffect(() => {
    async function loadFavs() {
      setLoading(true);
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists() && docSnap.data().favorites) {
            let userFavs = docSnap.data().favorites;
            // Si el usuario acaba de iniciar sesión y tenía favoritos en local, los fusionamos
            const local = localStorage.getItem('youmei_favorites');
            if (local) {
              const localFavs = JSON.parse(local);
              const merged = [...userFavs];
              localFavs.forEach(lf => {
                if (!merged.find(uf => uf.id === lf.id)) {
                  merged.push(lf);
                }
              });
              userFavs = merged;
              await setDoc(docRef, { favorites: userFavs }, { merge: true });
              localStorage.removeItem('youmei_favorites');
            }
            setFavorites(userFavs);
          } else {
            // No existe el documento en Firebase
            const local = localStorage.getItem('youmei_favorites');
            if (local) {
               const parsed = JSON.parse(local);
               setFavorites(parsed);
               await setDoc(docRef, { favorites: parsed }, { merge: true });
               localStorage.removeItem('youmei_favorites');
            } else {
               setFavorites([]);
            }
          }
        } catch (e) {
          console.error('Error cargando favoritos', e);
        }
      } else {
        const local = localStorage.getItem('youmei_favorites');
        if (local) {
          try {
            setFavorites(JSON.parse(local));
          } catch(e) {
            setFavorites([]);
          }
        } else {
          setFavorites([]);
        }
      }
      setLoading(false);
    }
    loadFavs();
  }, [user]);

  const toggleFavorite = async (product) => {
    setFavorites(prev => {
      const exists = prev.find(p => p.id === product.id);
      let newFavs;
      if (exists) {
        newFavs = prev.filter(p => p.id !== product.id);
      } else {
        newFavs = [...prev, { 
          id: product.id, 
          title: product.title || product.name, 
          image: product.image, 
          price: product.currentPrice || product.price || product.originalPrice || 0
        }];
      }
      
      // Guardar inmediatamente (useEffect a veces puede ser asíncrono y causar demoras visuales si se recarga)
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        setDoc(docRef, { favorites: newFavs }, { merge: true }).catch(console.error);
      } else {
        localStorage.setItem('youmei_favorites', JSON.stringify(newFavs));
      }
      return newFavs;
    });
  };

  const isFavorite = (productId) => {
    return favorites.some(p => p.id === productId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
  return context;
}
