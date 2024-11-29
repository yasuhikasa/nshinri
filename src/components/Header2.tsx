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
              記事一覧
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/privacy-policy2" className={styles.navLink}>
              プライバシーポリシー
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/contact" className={styles.navLink}>
              お問い合わせ
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
