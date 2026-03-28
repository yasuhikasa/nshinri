import styles from './Footer.module.css';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>N&apos;s WorkRoom</div>
        <div className={styles.links}>
          <Link href="/aboutme">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="https://lit.link/litA07">SNSリンク集</Link>
          <Link href="https://www.youtube.com/@yao7783">youtubeラジオ</Link>
          <Link href="https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q13326521473">
            知恵袋
          </Link>
          <Link href="https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q11326522851">
            知恵袋
          </Link>
          <Link href="https://x.com/nakayama157798" rel="me">
            X
          </Link>
          <Link href="https://www.tiktok.com/@huu98761" rel="me">
            TikTok
          </Link>
          <Link href="https://secondpath.jp/" rel="me">
            カウンセリング
          </Link>
          <Link href="https://gakki-app.vercel.app/" rel="me">
            wiki
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
