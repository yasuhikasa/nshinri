import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>
              トップページ
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/posts" className={styles.navLink}>
              コラム一覧
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/posts/counseling-column" className={styles.navLink}>
              カウンセリングの重要さ
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
