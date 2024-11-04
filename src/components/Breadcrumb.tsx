// components/Breadcrumb.tsx

import Link from 'next/link';
import styles from './Breadcrumb.module.css';

interface BreadcrumbProps {
  items: { name: string; href: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="breadcrumb" className={styles.breadcrumb}>
      <ol className={styles.list}>
        {items.map((item, index) => (
          <li key={index} className={styles.listItem}>
            {index < items.length - 1 ? (
              <Link href={item.href} legacyBehavior>
                <a className={styles.link}>{item.name}</a>
              </Link>
            ) : (
              <span className={styles.current}>{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
