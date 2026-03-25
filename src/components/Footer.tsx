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
          <Link href="https://lit.link/litA07" legacyBehavior>
            <a>SNSリンク集</a>
          </Link>
          <Link href="https://www.youtube.com/@yao7783" legacyBehavior>
            <a>youtubeラジオ</a>
          </Link>
          <Link href="https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q13326521473">
            <a>知恵袋</a>
          </Link>
          <Link href="https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q11326522851">
            <a>知恵袋</a>
          </Link>
          <Link href="https://x.com/nakayama157798" rel="me">
            <a>X</a>
          </Link>
          <Link href="https://www.tiktok.com/@huu98761" rel="me">
            <a>TikTok</a>
          </Link>
          <Link href="https://secondpath.jp/" rel="me">
            <a>カウンセリング</a>
          </Link>
          <Link href="https://gakki-app.vercel.app/" rel="me">
            <a>wiki</a>
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
