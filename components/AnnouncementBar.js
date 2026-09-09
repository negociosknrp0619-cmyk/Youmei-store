import styles from './AnnouncementBar.module.css';

export default function AnnouncementBar() {
  const messages = [
    "ENVIO GRATIS A TODO EL PERU 📦",
    "CONTÁCTANOS PARA REALIZAR LA COMPRA 🛒",
    "ASESORÍA ANTES DE TU COMPRA 💬",
    "PAGA CON YAPE, PLIN O TRANSFERENCIA",
    "PRODUCTOS ORIGINALES ✓",
    "COMPRA SEGURA 🔒"
  ];
  
  // Repetimos los mensajes varias veces para asegurar que cubran toda la pantalla
  // y luego duplicamos el bloque entero para que la animación infinita (transform: translateX(-50%)) sea fluida.
  const block = [...messages, ...messages, ...messages, ...messages];
  const finalMessages = [...block, ...block];

  return (
    <div className={styles.bar}>
      <div className={styles.marquee}>
        {finalMessages.map((msg, idx) => (
          <span key={idx} className={styles.item}>{msg}</span>
        ))}
      </div>
    </div>
  );
}
