const fs = require('fs');
let content = fs.readFileSync('app/productos/[id]/page.js', 'utf8');

// Replace imports
content = content.replace(
  "import { dummyProducts } from '../../../data/dummyProducts';",
  "import { db } from '../../../lib/firebase';\nimport { doc, getDoc, collection, getDocs } from 'firebase/firestore';"
);

// We need useEffect to fetch the specific product
content = content.replace(
  "  const product = dummyProducts.find(p => p.id === unwrappedParams.id) || dummyProducts[0];",
  `  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', unwrappedParams.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          // fallback or handle not found
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [unwrappedParams.id]);`
);

// We need to early return if loading or not found
content = content.replace(
  "  const [isAdding, setIsAdding] = useState(false);",
  "  const [isAdding, setIsAdding] = useState(false);\n\n  if (loading) return <div style={{padding: '5rem', textAlign: 'center'}}>Cargando producto...</div>;\n  if (!product) return <div style={{padding: '5rem', textAlign: 'center'}}>Producto no encontrado</div>;\n"
);

// Also the similar products section:
content = content.replace(
  "  const relatedProducts = dummyProducts.filter(p => p.id !== product.id).slice(0, 4);",
  `  // TODO: we should fetch related from firebase, for now empty array or fetch all
  const [relatedProducts, setRelatedProducts] = useState([]);
  React.useEffect(() => {
    if(!product) return;
    const fetchRelated = async () => {
      const snap = await getDocs(collection(db, 'products'));
      let prods = [];
      snap.forEach(d => {
        if(d.id !== product.id) prods.push({id: d.id, ...d.data()});
      });
      setRelatedProducts(prods.slice(0, 4));
    };
    fetchRelated();
  }, [product]);`
);

fs.writeFileSync('app/productos/[id]/page.js', content);
