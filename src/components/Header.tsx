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
            <Link href="/aboutme" className={styles.navLink}>
              「私」について
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
