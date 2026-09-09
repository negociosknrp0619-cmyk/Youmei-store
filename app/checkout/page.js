"use client";
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/components/CartProvider';
import { WHATSAPP_NUMBER } from '@/data/products';
import peruLocations from '@/data/peruLocations';
import styles from './checkout.module.css';

const STEPS = [
  { id: 0, label: 'Carrito de compras', icon: '🛒' },
  { id: 1, label: 'Datos personales', icon: '👤' },
  { id: 2, label: 'Tipos de envío', icon: '📦' },
  { id: 3, label: 'Método de pago', icon: '💳' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingType, setShippingType] = useState('domicilio');
  const [shippingMethod, setShippingMethod] = useState('');
  const [coupon, setCoupon] = useState('');

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    departamento: 'Lima',
    provincia: 'Lima',
    distrito: '',
    direccion: '',
    observaciones: ''
  });

  const isLima = formData.departamento === 'Lima' || formData.departamento === 'Callao';

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const isEstandarFree = totalQuantity >= 2;
  const estandarPrice = isEstandarFree ? 0 : 12;
  const estandarLabel = isEstandarFree ? 'Gratis' : 'S/. 12.00';

  const shippingOptions = isLima
    ? [
        { id: 'indrive', label: 'Envío InDrive', desc: 'Entrega el mismo día (solo Lima)', price: 0, priceLabel: 'Por coordinar' },
        { id: 'estandar', label: 'Envío Estándar', desc: '1 – 2 días hábiles', price: estandarPrice, priceLabel: estandarLabel },
      ]
    : [
        { id: 'shalom', label: 'Shalom', desc: 'S/ 12 – 15 · 3–5 días hábiles', price: 13, priceLabel: 'S/. 13.00' },
        { id: 'olva', label: 'Olva Courier', desc: 'S/ 12 – 15 · 3–5 días hábiles', price: 13, priceLabel: 'S/. 13.00' },
      ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && cart.length === 0) {
      router.push('/cart');
    }
  }, [isClient, cart, router]);

  // Reset shipping method when department changes
  useEffect(() => {
    setShippingMethod('');
  }, [formData.departamento]);

  // Computed provinces and districts from peruLocations data
  const departments = Object.keys(peruLocations);

  const provinces = useMemo(() => {
    const deptData = peruLocations[formData.departamento];
    return deptData ? Object.keys(deptData) : [];
  }, [formData.departamento]);

  const districts = useMemo(() => {
    const deptData = peruLocations[formData.departamento];
    if (!deptData) return [];
    return deptData[formData.provincia] || [];
  }, [formData.departamento, formData.provincia]);

  // Reset provincia & distrito when departamento changes
  useEffect(() => {
    const firstProv = provinces[0] || '';
    setFormData(prev => ({ ...prev, provincia: firstProv, distrito: '' }));
  }, [formData.departamento]);

  // Reset distrito when provincia changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, distrito: '' }));
  }, [formData.provincia]);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const selectedShipping = shippingOptions.find(o => o.id === shippingMethod);
  const shippingCost = selectedShipping ? selectedShipping.price : 0;
  const total = subtotal + shippingCost;

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'telefono') {
      value = value.replace(/\D/g, '');
      if (value.length > 9) value = value.slice(0, 9);
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleStepClick = (stepId) => {
    if (stepId === 0) {
      router.push('/cart');
      return;
    }
    // Solo permitir ir a pasos anteriores o al siguiente si el actual está validado
    if (stepId <= currentStep) {
      setCurrentStep(stepId);
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.nombre || !formData.apellido || !formData.telefono) {
        alert('Por favor completa los campos obligatorios (Nombre, Apellido y Teléfono).');
        return;
      }
      if (formData.telefono.length !== 9) {
        alert('El teléfono debe tener exactamente 9 dígitos.');
        return;
      }
    }
    if (currentStep === 2) {
      if (!formData.distrito || !formData.direccion) {
        alert('Por favor completa tu distrito y dirección de entrega.');
        return;
      }
      if (shippingType === 'domicilio' && !shippingMethod) {
        alert('Por favor selecciona un método de envío.');
        return;
      }
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = () => {
    const selectedOpt = shippingOptions.find(o => o.id === shippingMethod);

    let message = `*NUEVO PEDIDO - YOUMEI STORE*\n\n`;
    message += `*Datos del Cliente:*\n`;
    message += `👤 ${formData.nombre} ${formData.apellido}\n`;
    message += `📞 ${formData.telefono}\n`;
    message += `✉️ ${formData.email}\n`;

    message += `\n*Envío:* ${shippingType === 'domicilio' ? 'A domicilio' : 'Retiro en tienda'}\n`;
    if (selectedOpt) {
      message += `🚚 Método: ${selectedOpt.label} (${selectedOpt.priceLabel})\n`;
    }
    message += `📍 ${formData.distrito}, ${formData.provincia}, ${formData.departamento}\n`;
    message += `🏠 ${formData.direccion}\n`;

    if (formData.observaciones) {
      message += `\n📝 Observaciones: ${formData.observaciones}\n`;
    }

    message += `\n*Detalle del Pedido:*\n`;
    cart.forEach(item => {
      message += `- ${item.quantity}x ${item.name} — S/ ${(item.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\nSubtotal: S/ ${subtotal.toFixed(2)}`;
    if (shippingCost > 0) {
      message += `\nEnvío: S/ ${shippingCost.toFixed(2)}`;
    } else {
      message += `\nEnvío: ${selectedOpt ? selectedOpt.priceLabel : 'Gratis'}`;
    }
    message += `\n💰 *Total: S/ ${total.toFixed(2)}*\n`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
    clearCart();
    router.push('/');
  };

  if (!isClient || cart.length === 0) return null;

  return (
    <div className={styles.pageBackground}>
      <div className={styles.container}>

        {/* Progress Bar */}
        <div className={styles.progressBar}>
          {STEPS.map((step, i) => (
            <span key={step.id}>
              <button
                type="button"
                className={`${styles.progressStep} ${currentStep === step.id ? styles.active : ''} ${step.id < currentStep ? styles.completed : ''}`}
                onClick={() => handleStepClick(step.id)}
              >
                {step.icon} {step.label}
              </button>
              {i < STEPS.length - 1 && <span className={styles.progressSeparator}>›</span>}
            </span>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className={styles.layout}>

          {/* LEFT COLUMN */}
          <div>

            {/* STEP 1: Datos personales */}
            {currentStep === 1 && (
              <div className={styles.card}>
                <div className={styles.cardTitle}>
                  <span>👤 Datos personales</span>
                </div>
                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                    <label>Nombre <span style={{color: '#ff4444'}}>*</span></label>
                    <input type="text" name="nombre" className={styles.input} value={formData.nombre} onChange={handleChange} placeholder="Juan" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Apellido <span style={{color: '#ff4444'}}>*</span></label>
                    <input type="text" name="apellido" className={styles.input} value={formData.apellido} onChange={handleChange} placeholder="García" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Correo electrónico <span style={{color: '#a0a0a0', fontSize: '0.8rem', fontWeight: 'normal'}}>(Opcional)</span></label>
                    <input type="email" name="email" className={styles.input} value={formData.email} onChange={handleChange} placeholder="juan@email.com" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Teléfono / Celular <span style={{color: '#ff4444'}}>*</span></label>
                    <input type="tel" name="telefono" className={styles.input} value={formData.telefono} onChange={handleChange} placeholder="987 654 321" maxLength={9} pattern="[0-9]{9}" required />
                    <span style={{color: '#a0a0a0', fontSize: '0.75rem', marginTop: '4px', display: 'block'}}>Debe contener exactamente 9 dígitos</span>
                  </div>
                </div>
                <button type="button" className={styles.nextBtn} onClick={handleNext}>
                  Continuar al envío →
                </button>
              </div>
            )}

            {/* STEP 2: Tipos de envío */}
            {currentStep === 2 && (
              <div>
                {/* Mini resumen datos personales */}
                <div className={styles.card}>
                  <div className={styles.cardTitle}>
                    <span>Datos personales</span>
                    <button type="button" className={styles.editBtn} onClick={() => setCurrentStep(1)}>✏️</button>
                  </div>
                  <p className={styles.miniSummary}>
                    {formData.email}<br/>
                    {formData.nombre} {formData.apellido}<br/>
                    {formData.telefono}
                  </p>
                </div>

                <div className={styles.card}>
                  <div className={styles.cardTitle}>Envío</div>

                  <div className={styles.formGrid}>
                    <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                      <label>Departamento</label>
                      <select name="departamento" className={`${styles.input} ${styles.select}`} value={formData.departamento} onChange={handleChange} required>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Provincia</label>
                      <select name="provincia" className={`${styles.input} ${styles.select}`} value={formData.provincia} onChange={handleChange} required>
                        {provinces.map(prov => (
                          <option key={prov} value={prov}>{prov}</option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Distrito</label>
                      <select name="distrito" className={`${styles.input} ${styles.select}`} value={formData.distrito} onChange={handleChange} required>
                        <option value="">Selecciona un distrito</option>
                        {districts.map(dist => (
                          <option key={dist} value={dist}>{dist}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={`${styles.inputGroup}`} style={{marginTop: '0.5rem'}}>
                    <label>Complete su dirección de entrega</label>
                    <input type="text" name="direccion" className={styles.input} value={formData.direccion} onChange={handleChange} placeholder="Av. Principal 123, Dpto 4B" required />
                  </div>

                  {/* Método de envío */}
                    <div style={{marginTop: '1.5rem'}}>
                      <label className={styles.shippingMethodLabel}>Método de envío <span style={{color: '#ff4444'}}>*</span></label>
                      <div className={styles.shippingMethodList}>
                        {shippingOptions.map(opt => (
                          <label
                            key={opt.id}
                            className={`${styles.shippingOption} ${shippingMethod === opt.id ? styles.shippingOptionActive : ''}`}
                          >
                            <div className={styles.shippingOptionLeft}>
                              <input
                                type="radio"
                                name="shippingMethod"
                                value={opt.id}
                                checked={shippingMethod === opt.id}
                                onChange={() => setShippingMethod(opt.id)}
                              />
                              <div>
                                <div className={styles.shippingOptionName}>{opt.label}</div>
                                <div className={styles.shippingOptionDesc}>{opt.desc}</div>
                              </div>
                            </div>
                            <div className={styles.shippingOptionPrice}>{opt.priceLabel}</div>
                          </label>
                        ))}
                      </div>
                    </div>

                  <button type="button" className={styles.nextBtn} onClick={handleNext} style={{marginTop: '1.5rem'}}>
                    Continuar al pago →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Método de pago / Confirmación */}
            {currentStep === 3 && (
              <div>
                {/* Mini resumen datos personales */}
                <div className={styles.card}>
                  <div className={styles.cardTitle}>
                    <span>Datos personales</span>
                    <button type="button" className={styles.editBtn} onClick={() => setCurrentStep(1)}>✏️</button>
                  </div>
                  <p className={styles.miniSummary}>
                    {formData.email}<br/>
                    {formData.nombre} {formData.apellido}<br/>
                    {formData.telefono}
                  </p>
                </div>

                {/* Mini resumen envío */}
                <div className={styles.card}>
                  <div className={styles.cardTitle}>
                    <span>Envío</span>
                    <button type="button" className={styles.editBtn} onClick={() => setCurrentStep(2)}>✏️</button>
                  </div>
                  <p className={styles.miniSummary}>
                    {shippingType === 'domicilio' ? '🚚 Envío a domicilio' : '🏪 Retiro en tienda'}<br/>
                    {formData.direccion}<br/>
                    {formData.distrito}, {formData.provincia} - {formData.departamento}
                  </p>
                </div>

                {/* Método de pago */}
                <div className={styles.card}>
                  <div className={styles.cardTitle}>Método de pago</div>
                  <p className={styles.miniSummary} style={{marginBottom: '1.5rem'}}>
                    Al hacer clic en <strong>"Finalizar pedido"</strong>, se abrirá WhatsApp con todos los datos de tu pedido para coordinar el pago directamente con nosotros.
                  </p>
                  <button type="button" className={styles.submitBtn} onClick={handleSubmit}>
                    💬 Finalizar pedido por WhatsApp →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN - Resumen */}
          <div>
            <div className={styles.summaryCard}>
              <div className={styles.summaryHeader}>
                <h2>Resumen de la compra</h2>
                <Link href="/cart" className={styles.backLink}>Volver al carrito</Link>
              </div>

              {cart.map((item, i) => (
                <div key={i} className={styles.itemBox}>
                  {item.quantity > 1 && (
                    <span className={styles.itemQtyBubble}>{item.quantity}</span>
                  )}
                  <div className={styles.itemImg}>
                    <Image src={item.image} alt={item.name} width={46} height={46} style={{objectFit: 'contain', width: '100%', height: '100%'}} />
                  </div>
                  <div className={styles.itemDetails}>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.itemPrice}>S/ {(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              ))}

              <span className={styles.couponLabel}>¿Tienes cupón de descuento?</span>
              <div className={styles.couponFlex}>
                <input type="text" className={styles.couponInput} value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Código" />
                <button type="button" className={styles.couponBtn}>Aplicar</button>
              </div>

              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>S/ {subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Gastos del envío</span>
                <span style={{color: shippingCost > 0 ? '#fff' : '#25d366', fontWeight: 600}}>
                  {shippingMethod 
                    ? (selectedShipping?.priceLabel || 'Gratis') 
                    : 'Por definir'}
                </span>
              </div>
              <div className={styles.summaryDivider}></div>
              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>S/ {total.toFixed(2)}</span>
              </div>

              <span className={styles.couponLabel}>¿Tienes alguna indicación para tu pedido?</span>
              <textarea
                className={styles.observationTextarea}
                placeholder="Escribe tus observaciones aquí..."
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
