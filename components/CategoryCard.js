import Image from 'next/image';
import Link from 'next/link';
import styles from './CategoryCard.module.css';

export default function CategoryCard({ category }) {
  return (
    <Link href={`/category/${category.id}`} className={`card hover-scale ${styles.categoryCard}`}>
      <div className={styles.imageContainer}>
        <Image 
          src={category.image} 
          alt={category.name}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className={styles.overlay}>
          <h3 className={styles.title}>{category.name}</h3>
        </div>
      </div>
    </Link>
  );
}
