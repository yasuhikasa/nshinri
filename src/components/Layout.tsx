// components/Layout.tsx
import React from 'react';
import Footer from './Footer';
import styles from './Layout.module.css'; // レイアウト用のCSSモジュール

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
