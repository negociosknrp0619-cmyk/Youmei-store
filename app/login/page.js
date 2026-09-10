"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '../../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { useAuth } from '../../components/AuthProvider';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Si ya está logueado, redirigir al inicio
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const getErrorMessage = (code) => {
    switch (code) {
      case 'auth/user-not-found': return 'No existe una cuenta con este correo.';
      case 'auth/wrong-password': return 'Contraseña incorrecta.';
      case 'auth/invalid-credential': return 'Correo o contraseña incorrectos.';
      case 'auth/email-already-in-use': return 'Ya existe una cuenta con este correo.';
      case 'auth/weak-password': return 'La contraseña debe tener al menos 6 caracteres.';
      case 'auth/invalid-email': return 'El correo electrónico no es válido.';
      case 'auth/too-many-requests': return 'Demasiados intentos. Intenta de nuevo más tarde.';
      case 'auth/popup-closed-by-user': return 'Se cerró la ventana de Google.';
      case 'auth/operation-not-allowed': return 'Este método de inicio de sesión no está habilitado. Contacta al administrador.';
      default: return 'Ocurrió un error. Intenta de nuevo.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (activeTab === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (name) {
          await updateProfile(cred.user, { displayName: name });
        }
      }
      router.push('/');
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Escribe tu correo electrónico arriba para restablecer tu contraseña.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      setTimeout(() => setResetSent(false), 5000);
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        
        <div className={styles.tabs}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'login' ? styles.active : ''}`}
            onClick={() => { setActiveTab('login'); setError(''); }}
          >
            Iniciar sesión
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'register' ? styles.active : ''}`}
            onClick={() => { setActiveTab('register'); setError(''); }}
          >
            Registrarse
          </button>
        </div>

        {error && (
          <div style={{background: '#ff444422', border: '1px solid #ff4444', color: '#ff6666', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '0.5rem'}}>
            {error}
          </div>
        )}

        {resetSent && (
          <div style={{background: '#34A85322', border: '1px solid #34A853', color: '#34A853', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '0.5rem'}}>
            ¡Listo! Revisa tu correo para restablecer tu contraseña.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          
          {activeTab === 'register' && (
            <div className={styles.formGroup}>
              <label className={styles.label}>Nombre completo</label>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="Tu nombre" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.label}>Correo electrónico</label>
            <input 
              type="email" 
              className={styles.input} 
              placeholder="tucorreo@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Contraseña</label>
            <input 
              type="password" 
              className={styles.input} 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            {activeTab === 'login' && (
              <button 
                type="button" 
                className={styles.forgotPassword} 
                onClick={handleForgotPassword}
                style={{background: 'none', border: 'none', cursor: 'pointer', padding: 0}}
              >
                ¿Olvidaste tu contraseña?
              </button>
            )}
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Cargando...' : (activeTab === 'login' ? 'Iniciar sesión' : 'Crear cuenta')}
          </button>

          <div className={styles.divider}>
            <span>o</span>
          </div>

          <button type="button" className={styles.googleBtn} onClick={handleGoogle} disabled={loading}>
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuar con Google
          </button>
        </form>

      </div>
    </div>
  );
}
