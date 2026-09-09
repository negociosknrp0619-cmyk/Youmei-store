import styles from './contacto.module.css';

export const metadata = {
  title: 'Contacto | Youmei Store',
  description: 'Ponte en contacto con Youmei Store para cualquier consulta sobre nuestros productos.',
};

export default function ContactoPage() {
  return (
    <div className={styles.pageContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.heroTitle}>Contáctanos</h1>
          <p className={styles.heroSubtitle}>Estamos aquí para ayudarte a elegir el mejor equipo.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className={`container ${styles.contactSection}`}>
        <div className={styles.contactGrid}>
          
          {/* Left Column: Info Cards */}
          <div className={styles.infoWrapper}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div className={styles.infoContent}>
                <h3>Teléfono</h3>
                <p>+51 983 725 740</p>
              </div>
            </div>

            <a href="#" className={styles.infoCard} style={{textDecoration: 'none'}}>
              <div className={styles.infoIcon}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              </div>
              <div className={styles.infoContent}>
                <h3>WhatsApp</h3>
                <p>Chat disponible</p>
              </div>
            </a>

            <a href="https://www.instagram.com/youmeitec/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer" className={styles.infoCard} style={{textDecoration: 'none'}}>
              <div className={styles.infoIcon}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </div>
              <div className={styles.infoContent}>
                <h3>Instagram</h3>
                <p>@youmeitec</p>
              </div>
            </a>

            <a href="https://www.tiktok.com/@youmei.store.peru" target="_blank" rel="noopener noreferrer" className={styles.infoCard} style={{textDecoration: 'none'}}>
              <div className={styles.infoIcon}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
              </div>
              <div className={styles.infoContent}>
                <h3>TikTok</h3>
                <p>@youmei.store.peru</p>
              </div>
            </a>

            <a href="https://www.facebook.com/youmeiperu" target="_blank" rel="noopener noreferrer" className={styles.infoCard} style={{textDecoration: 'none'}}>
              <div className={styles.infoIcon}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </div>
              <div className={styles.infoContent}>
                <h3>Facebook</h3>
                <p>Youmei Store</p>
              </div>
            </a>

            <a href="mailto:contacto.youmeistore@gmail.com" className={styles.infoCard} style={{textDecoration: 'none'}}>
              <div className={styles.infoIcon}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div className={styles.infoContent}>
                <h3>Correo</h3>
                <p>Envíanos un e-mail</p>
              </div>
            </a>

            <a href="https://linktr.ee/youmeitec" target="_blank" rel="noopener noreferrer" className={styles.infoCard} style={{textDecoration: 'none'}}>
              <div className={styles.infoIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36"><path d="m13.73635 5.85251 4.00467-4.11665 2.3248 2.3808-4.20064 4.00466h5.9085v3.30473h-5.9365l4.22865 4.10766-2.3248 2.3338L12.0005 12.099l-5.74052 5.76852-2.3248-2.3248 4.22864-4.10766h-5.9375V8.12132h5.9085L3.93417 4.11666l2.3248-2.3808 4.00468 4.11665V0h3.4727zm-3.4727 10.30614h3.4727V24h-3.4727z"/></svg>
              </div>
              <div className={styles.infoContent}>
                <h3>Linktree</h3>
                <p>Todos nuestros links</p>
              </div>
            </a>

            <a href="#" target="_blank" rel="noopener noreferrer" className={styles.infoCard} style={{textDecoration: 'none'}}>
              <div className={styles.infoIcon}>
                <img src="/canva-logo.png?v=3" alt="Canva Logo" width="48" height="48" style={{ objectFit: 'contain', transform: 'scale(1.3)' }} />
              </div>
              <div className={styles.infoContent}>
                <h3>Canva</h3>
                <p>Revisa nuestro catálogo</p>
              </div>
            </a>
          </div>

          {/* Right Column: Contact Form */}
          <div className={styles.formWrapper}>
            <div className={styles.formHeader}>
              <h2>Envíanos un mensaje</h2>
              <p>Llena el formulario y nos pondremos en contacto contigo lo más pronto posible.</p>
            </div>
            
            <form className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Nombre completo</label>
                <input type="text" id="name" className={styles.input} placeholder="Ej. Juan Pérez" required />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email">Correo electrónico</label>
                <input type="email" id="email" className={styles.input} placeholder="tu@correo.com" required />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="phone">Celular (Opcional)</label>
                <input type="tel" id="phone" className={styles.input} placeholder="+51 999 999 999" />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="message">Mensaje</label>
                <textarea id="message" className={styles.input} placeholder="¿En qué podemos ayudarte?" required></textarea>
              </div>

              <button type="button" className={styles.submitBtn}>
                Enviar Mensaje
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* FAQ and Map Section */}
      <section className={`container ${styles.faqSection}`}>
        <div className={styles.faqGrid}>
          
          {/* Left Column: FAQ */}
          <div className={styles.faqWrapper}>
            <h2>PREGUNTAS FRECUENTES</h2>
            <div className={styles.accordion}>
              
              <details className={styles.details}>
                <summary className={styles.summary}>
                  <span className={styles.faqIcon}>🚚</span>
                  ¿Llegan a mi ciudad si estoy fuera de Lima?
                  <span className={styles.chevron}>▼</span>
                </summary>
                <div className={styles.faqAnswer}>
                  <p>¡Claro que sí! Hacemos despachos a todo el Perú mediante Olva Courier, Shalom y agencias terrestres de confianza. Tu equipo audiovisual viajará 100% seguro y muy bien embalado.</p>
                </div>
              </details>

              <details className={styles.details}>
                <summary className={styles.summary}>
                  <span className={styles.faqIcon}>🛡️</span>
                  ¿Qué cobertura de garantía ofrecen?
                  <span className={styles.chevron}>▼</span>
                </summary>
                <div className={styles.faqAnswer}>
                  <p>En Youmei Store todos nuestros equipos son originales y cuentan con garantía oficial por defectos de fábrica (de 6 a 12 meses). Solo necesitas conservar tu comprobante de compra para cualquier gestión.</p>
                </div>
              </details>

              <details className={styles.details}>
                <summary className={styles.summary}>
                  <span className={styles.faqIcon}>🤝</span>
                  No sé qué equipo elegir, ¿pueden ayudarme?
                  <span className={styles.chevron}>▼</span>
                </summary>
                <div className={styles.faqAnswer}>
                  <p>¡Esa es nuestra especialidad! Escríbenos por WhatsApp y uno de nuestros expertos te brindará asesoría personalizada para que inviertas en el micrófono o estabilizador exacto que necesitas.</p>
                </div>
              </details>

              <details className={styles.details}>
                <summary className={styles.summary}>
                  <span className={styles.faqIcon}>🔒</span>
                  ¿Es seguro comprar en su tienda virtual?
                  <span className={styles.chevron}>▼</span>
                </summary>
                <div className={styles.faqAnswer}>
                  <p>Totalmente. Trabajamos con pasarelas de pago 100% seguras y encriptadas. Tus datos personales y bancarios estarán siempre protegidos bajo estrictos estándares de seguridad.</p>
                </div>
              </details>

              <details className={styles.details}>
                <summary className={styles.summary}>
                  <span className={styles.faqIcon}>📦</span>
                  ¿En cuántos días tendré mi pedido?
                  <span className={styles.chevron}>▼</span>
                </summary>
                <div className={styles.faqAnswer}>
                  <p>Si estás en Lima Metropolitana, tu equipo llegará entre 24 y 48 horas útiles. Para envíos a provincia, el tiempo regular es de 3 a 5 días hábiles dependiendo de la agencia elegida.</p>
                </div>
              </details>

              <details className={styles.details}>
                <summary className={styles.summary}>
                  <span className={styles.faqIcon}>💳</span>
                  ¿Con qué métodos de pago puedo cancelar?
                  <span className={styles.chevron}>▼</span>
                </summary>
                <div className={styles.faqAnswer}>
                  <p>Para tu total comodidad, aceptamos transferencias directas, Yape, Plin y pagos seguros con cualquier tarjeta de crédito o débito a través de nuestra web.</p>
                </div>
              </details>

            </div>
          </div>

          {/* Right Column: Virtual Store Graphic */}
          <div className={styles.mapWrapper} style={{ padding: 0, position: 'relative' }}>
            
            {/* Youmei Logo Overlay */}
            <div className={styles.floatingLogo}>
              <img src="/logo.png" alt="Youmei Store Logo" />
            </div>

            <div className={styles.shippingOverlay}>
              <h3>Envíos Rápidos y Seguros</h3>
              <p>Llegamos a cada rincón del Perú con la máxima seguridad para tus equipos.</p>
              <div className={styles.trustBadges}>
                <span className={styles.badge}>🔒 Compra Protegida</span>
                <span className={styles.badge}>🤝 Asesoría Experta</span>
                <span className={styles.badge}>🛡️ Garantía Oficial</span>
              </div>
            </div>
            <img 
              src="/images/virtual_store_shipping_clean.jpg" 
              alt="Envíos seguros a todo el Perú" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} 
            />
          </div>

        </div>
      </section>

    </div>
  );
}
