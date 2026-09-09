const fs = require('fs');

let content = fs.readFileSync('app/productos/page.js', 'utf8');

// Replace import { dummyProducts }
content = content.replace(
  "import { dummyProducts } from '../../data/dummyProducts';",
  "import { db } from '../../lib/firebase';\nimport { collection, getDocs } from 'firebase/firestore';"
);

// Add state and useEffect for products
content = content.replace(
  "  const [priceRange, setPriceRange] = useState([0, 5000]);",
  "  const [priceRange, setPriceRange] = useState([0, 5000]);\n  const [allProducts, setAllProducts] = useState([]);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    const fetchProducts = async () => {\n      try {\n        const snap = await getDocs(collection(db, 'products'));\n        const prods = [];\n        snap.forEach(doc => prods.push({ id: doc.id, ...doc.data() }));\n        setAllProducts(prods);\n      } catch (err) {\n        console.error('Error fetching products', err);\n      } finally {\n        setLoading(false);\n      }\n    };\n    fetchProducts();\n  }, []);"
);

// Replace dummyProducts with allProducts in useMemo
content = content.replace(
  "    let prods = [...dummyProducts];",
  "    let prods = [...allProducts];"
);

// Render loading state conditionally
content = content.replace(
  "            <div className={styles.productGrid}>",
  "            {loading ? <p style={{padding: '2rem', textAlign: 'center'}}>Cargando productos...</p> : <div className={styles.productGrid}>"
);

content = content.replace(
  "            </div>\n          </div>\n        </main>\n      </div>\n    </div>",
  "            </div>}\n          </div>\n        </main>\n      </div>\n    </div>"
);

fs.writeFileSync('app/productos/page.js', content);
