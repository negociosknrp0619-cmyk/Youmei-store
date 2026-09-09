import { products, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { notFound } from 'next/navigation';

export default function CategoryPage({ params }) {
  const { slug } = params;
  const category = categories.find(c => c.id === slug);
  
  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(p => p.category === slug);

  return (
    <div className="container" style={{ paddingTop: '3rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>{category.name}</h1>
      
      {categoryProducts.length === 0 ? (
        <p>No hay productos en esta categoría aún.</p>
      ) : (
        <div className="grid-4">
          {categoryProducts.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
}
