"use client";
import styles from './page.module.css';
import Navbar from '../../components/Navbar';

export default function TerminosPage() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.headerSection}>
            <h1 className={styles.title}>Términos y Condiciones</h1>
            <p className={styles.subtitle}>Actualizado por última vez: Agosto 2026</p>
          </div>

          <div className={styles.content}>
            <section className={styles.section}>
              <h2>1. Política de Envíos y Entregas</h2>
              <ul>
                <li><strong>Tiempos de entrega:</strong> Los pedidos dentro de Lima Metropolitana se entregan en un plazo de 24 a 48 horas hábiles tras la confirmación del pago. Para provincias, el tiempo de entrega es de 3 a 5 días hábiles.</li>
                <li><strong>Envío Gratis:</strong> La promoción de "Envío GRATIS a partir del 2do producto" aplica únicamente para compras realizadas en una misma orden y destinadas a una misma dirección de envío.</li>
                <li><strong>Agencias:</strong> Los envíos a provincia se realizan a través de agencias autorizadas (Shalom, Olva Courier, entre otras). El cliente debe recoger el producto en la agencia o solicitar el envío a domicilio si la agencia lo permite.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>2. Política de Cambios y Devoluciones</h2>
              <ul>
                <li><strong>Plazo:</strong> Todo cliente tiene derecho a solicitar un cambio o devolución dentro de los <strong>7 días calendario</strong> posteriores a la recepción del producto, en caso de arrepentimiento de compra o insatisfacción.</li>
                <li><strong>Condiciones del producto:</strong> Para que el cambio o devolución sea válido, el producto debe estar en su caja original, sellado, sin signos de uso, rayaduras, y con todos sus accesorios, manuales y etiquetas originales.</li>
                <li><strong>Fallas de origen:</strong> Si el producto presenta fallas de fábrica al sacarlo de la caja, debe ser reportado dentro de las primeras 48 horas para su reemplazo inmediato tras la evaluación técnica.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>3. Condiciones de Garantía</h2>
              <ul>
                <li><strong>Cobertura:</strong> Ofrecemos <strong>12 meses de garantía</strong> en todos nuestros equipos DJI por defectos o fallas de fabricación.</li>
                <li><strong>Exclusiones:</strong> La garantía <strong>NO CUBRE</strong> daños ocasionados por factores externos, tales como: contacto con agua, arena, caídas, golpes, sobrecargas eléctricas, mal uso de la batería, actualizaciones de software no oficiales o manipulación por personal técnico no autorizado.</li>
                <li><strong>Procedimiento:</strong> El cliente debe entregar el producto a nuestra tienda para la evaluación técnica. El tiempo estimado de respuesta para reclamos de garantía es de 7 a 15 días hábiles.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>4. Pagos y Antifraude</h2>
              <ul>
                <li><strong>Validación de identidad:</strong> Por su seguridad, en compras de alto valor con tarjetas de crédito/débito, nuestra pasarela de pagos podría solicitar una validación de identidad (como una foto del DNI) para evitar fraudes y suplantación de identidad.</li>
                <li><strong>Cuotas:</strong> Las condiciones, intereses (si los hubiera) y plazos del pago en cuotas (ej. PowerPay, Diners, etc.) dependen exclusivamente de la entidad financiera del cliente y del proveedor del servicio de pagos.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>5. Privacidad de Datos</h2>
              <p>
                En Youmei Store respetamos su privacidad. Sus datos personales (nombre, DNI, dirección, teléfono y correo electrónico) son recopilados exclusivamente para procesar, enviar y facturar sus pedidos. Nos comprometemos a no vender, alquilar ni compartir su información con terceros para fines publicitarios ajenos a nuestra tienda.
              </p>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
