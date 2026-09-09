export const WHATSAPP_NUMBER = "51983725740"; // Número de WhatsApp de Youmei Store
export const STORE_NAME = "Youmei Store";

export const categories = [
  { id: 'dji', name: 'DJI' },
  { id: 'ulanzi', name: 'Ulanzi' },
  { id: 'godox', name: 'Godox' },
  { id: 'hohem', name: 'Hohem' },
  { id: 'hollyland', name: 'Hollyland' },
  { id: 'smallrig', name: 'SmallRig' },
  { id: 'accesorios', name: 'Accesorios' }
];

export const productTypes = [
  { id: 'camaras', name: 'Cámaras', image: '/images/dji_osmo_action_6.jpg' },
  { id: 'audio', name: 'Audio', image: '/images/hero_microphone.jpg' },
  { id: 'estabilizadores', name: 'Estabilizadores', image: '/images/stabilizer_gimbal.jpg' },
  { id: 'iluminacion', name: 'Iluminación', image: '/images/rgb_led_light.jpg' },
  { id: 'soporte', name: 'Soporte', image: '/images/tripod_stand.jpg' },
  { id: 'accesorios', name: 'Accesorios', image: '/images/creator_accessories.jpg' }
];

export const products = [
  // DJI
  {
    id: 'dji-mic-mini-2',
    name: 'DJI Mic Mini 2',
    category: 'dji',
    type: 'audio',
    price: 299.00,
    description: 'Sistema de micrófono inalámbrico ultra compacto con diseño futurista y grabación de alta fidelidad. Audio profesional sin límites.',
    image: '/images/dji_mic_mini_2.jpg',
    featured: true
  },
  {
    id: 'dji-osmo-mobile-8',
    name: 'DJI Osmo Mobile 8',
    category: 'dji',
    type: 'estabilizadores',
    price: 199.00,
    description: 'El futuro de la estabilización móvil. Diseño en fibra de carbono y seguimiento IA de última generación.',
    image: '/images/dji_osmo_mobile_8.jpg',
    featured: true
  },
  {
    id: 'dji-rs-5-mini-combo',
    name: 'DJI RS 5 Mini Combo',
    category: 'dji',
    type: 'estabilizadores',
    price: 450.00,
    description: 'Estabilizador compacto y poderoso para cámaras mirrorless, con la mejor relación peso-potencia del mercado.',
    image: '/images/dji_rs_5_mini.jpg',
    featured: true
  },
  {
    id: 'dji-osmo-action-6',
    name: 'DJI Osmo Action 6',
    category: 'dji',
    type: 'camaras',
    price: 399.00,
    description: 'Cámara de acción ultra resistente con pantallas duales y resolución 4K hiperrealista. Perfecta para aventuras extremas.',
    image: '/images/dji_osmo_action_6.jpg',
    featured: true
  },
  {
    id: 'osmo-pocket-4',
    name: 'Osmo Pocket 4',
    category: 'dji',
    type: 'camaras',
    price: 499.00,
    description: 'Cámara de bolsillo con estabilizador mecánico integrado y una enorme pantalla vertical para tus mejores tomas.',
    image: '/images/dji_osmo_pocket_4.jpg',
    featured: true
  },
  // Ulanzi
  {
    id: 'ulanzi-vl120-rgb',
    name: 'Ulanzi VL120 RGB',
    category: 'ulanzi',
    type: 'iluminacion',
    price: 45.00,
    description: 'Luz LED RGB compacta ideal para vlogging y fotografía de productos.',
    image: '/images/rgb_led_light.jpg',
    featured: false
  },
  {
    id: 'ulanzi-mt-44',
    name: 'Trípode Ulanzi MT-44 Extensible',
    category: 'ulanzi',
    type: 'soporte',
    price: 35.00,
    description: 'Mini trípode extensible 2 en 1, perfecto para smartphones y cámaras de acción.',
    image: '/images/tripod_stand.jpg',
    featured: false
  },
  // Godox
  {
    id: 'godox-sl60w',
    name: 'Godox SL60W LED Video Light',
    category: 'godox',
    type: 'iluminacion',
    price: 135.00,
    description: 'Luz continua de 60W para video y fotografía de estudio. Alto índice CRI.',
    image: '/images/rgb_led_light.jpg',
    featured: false
  },
  // Hohem
  {
    id: 'hohem-isteady-m6',
    name: 'Hohem iSteady M6 Kit',
    category: 'hohem',
    type: 'estabilizadores',
    price: 209.00,
    description: 'Estabilizador para smartphone de 3 ejes con sensor de visión magnético AI.',
    image: '/images/stabilizer_gimbal.jpg',
    featured: false
  },
  // Hollyland
  {
    id: 'hollyland-lark-m2',
    name: 'Micrófono Inalámbrico Hollyland Lark M2',
    category: 'hollyland',
    type: 'audio',
    price: 159.00,
    description: 'Sistema de micrófono inalámbrico súper ligero, perfecto para vlogging y entrevistas.',
    image: '/images/hero_microphone.jpg',
    featured: false
  },
  // SmallRig
  {
    id: 'smallrig-rc-60b',
    name: 'SmallRig RC 60B',
    category: 'smallrig',
    type: 'iluminacion',
    price: 199.00,
    description: 'Luz LED COB bicolor ultra portátil con batería integrada de gran capacidad.',
    image: '/images/rgb_led_light.jpg',
    featured: false
  },
  {
    id: 'smallrig-heavy-duty-tripod',
    name: 'SmallRig Trípode Fibra de Carbono',
    category: 'smallrig',
    type: 'soporte',
    price: 249.00,
    description: 'Ligero y ultra resistente. Soporta hasta 15kg, ideal para cámaras DSLR y mirrorless.',
    image: '/images/tripod_stand.jpg',
    featured: false
  },
  // Accesorios
  {
    id: 'kit-limpieza-camara',
    name: 'Kit Profesional de Limpieza 9 en 1',
    category: 'accesorios',
    type: 'accesorios',
    price: 25.00,
    description: 'Kit completo para limpiar lentes, sensores y pantallas. Imprescindible en tu mochila fotográfica.',
    image: '/images/creator_accessories.jpg',
    featured: false
  }
];
