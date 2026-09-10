"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../components/AuthProvider';
import { updateProfile, updatePassword } from 'firebase/auth';
import styles from './perfil.module.css';

export default function PerfilPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
      setName(user.displayName || '');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className={styles.loading}>Cargando perfil...</div>;
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsUpdating(true);

    try {
      if (name !== user.displayName) {
        await updateProfile(user, { displayName: name });
      }
      
      if (newPassword) {
        await updatePassword(user, newPassword);
        setNewPassword('');
      }

      setMessage('Perfil actualizado correctamente.');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/requires-recent-login') {
        setError('Por seguridad, debes cerrar sesión y volver a entrar para cambiar tu contraseña.');
      } else {
        setError('Hubo un error al actualizar el perfil.');
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Mi Perfil</h1>
        
        {message && <div className={styles.successMessage}>{message}</div>}
        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {user.photoURL ? (
              <img src={user.photoURL} alt="Avatar" />
            ) : (
              <span>{name ? name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div className={styles.userEmail}>{user.email}</div>
        </div>

        <form onSubmit={handleUpdateProfile} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nombre</label>
            <input 
              type="text" 
              className={styles.input} 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre completo"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Nueva Contraseña (opcional)</label>
            <input 
              type="password" 
              className={styles.input} 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Dejar en blanco para no cambiar"
            />
          </div>

          <button type="submit" className={styles.saveBtn} disabled={isUpdating}>
            {isUpdating ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </form>

        <button type="button" onClick={handleLogout} className={styles.logoutBtn}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
} 
