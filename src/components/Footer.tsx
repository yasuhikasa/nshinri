import styles from './Footer.module.css';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>N&apos;s WorkRoom</div>
        <div className={styles.links}>
          <Link href="/aboutme" legacyBehavior>
            <a>About</a>
          </Link>
          <Link href="/contact" legacyBehavior>
            <a>Contact</a>
          </Link>
          <Link href="/privacy-policy" legacyBehavior>
            <a>Privacy Policy</a>
          </Link>
        </div>
        <div className={styles.copyright}>
          <p>
            &copy; {new Date().getFullYear()} N&apos;s WorkRoom. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
