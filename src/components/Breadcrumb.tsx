import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Breadcrumb.module.css'; // パンくず用のCSSモジュール

// パスとラベルのマッピングを定義
const breadcrumbMap: { [key: string]: string } = {
  '/': 'ホーム',
  '/aboutme': '私について',
  '/counseling': 'カウンセリング',
  '/kaigokiroku': '介護記録アプリ',
  '/kindle': 'Kindle出版',
};

const Breadcrumb: React.FC = () => {
  const router = useRouter();
  const pathArray = router.asPath.split('/').filter((path) => path);

  // パンくずリストを生成
  const breadcrumbItems = pathArray.map((path, index) => {
    const href = '/' + pathArray.slice(0, index + 1).join('/');
    const label = breadcrumbMap[href] || decodeURIComponent(path);
    const isLast = index === pathArray.length - 1;

    return (
      <li key={index}>
        {isLast ? <span>{label}</span> : <Link href={href}>{label}</Link>}
      </li>
    );
  });

  return (
    <nav aria-label="breadcrumb" className={styles.breadcrumb}>
      <ol>
        <li>
          <Link href="/">{breadcrumbMap['/']}</Link>
        </li>
        {breadcrumbItems}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
