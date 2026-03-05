import React, { useState } from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import styles from './contact.module.css';
import Header from '../../components/Header';
import Link from 'next/link';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setError(''); // エラーをリセット
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 件名とメッセージの文字数チェック
    if (formData.subject.length > 50 || formData.message.length > 1000) {
      alert('件名は50文字以内、内容は1000文字以内にしてください。');
      return;
    }

    // メールアドレスの一致確認
    if (formData.email !== formData.confirmEmail) {
      setError('メールアドレスが一致しません。');
      return;
    }

    // 確認ダイアログの表示
    const isConfirmed = window.confirm('送信してもよろしいですか？');

    if (!isConfirmed) {
      return; // ユーザーが「キャンセル」を選んだ場合、送信を中止
    } else {
      window.alert('送信しました！');
    }

    const response = await fetch('/api/sendContact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        confirmEmail: '',
        subject: '',
        message: '',
      });
    } else {
      alert('送信に失敗しました。再度お試しください。');
    }
  };

  const breadcrumbItems = [
    { name: 'ホーム', href: '/' },
    { name: 'お問い合わせ', href: '/contact' },
  ];

  return (
    <>
      {/* NextSeo による SEO 設定 */}
      <NextSeo
        title="お問い合わせ - Nくん"
        description="Nくんのスマホアプリや開発、心理カウンセリングとライフコーチングに関するお問い合わせページです。"
        canonical="https://nshinri.net/contact"
        openGraph={{
          url: 'https://nshinri.net/contact',
          title: 'お問い合わせ - Nくん',
          description:
            'Nくんのスマホアプリや開発、心理カウンセリングとライフコーチングに関するお問い合わせページです。',
          images: [
            {
              url: 'https://nshinri.net/me.png',
              width: 1200,
              height: 630,
              alt: '日笠泰彰による心理カウンセリングとライフコーチング - Nくん',
            },
          ],
          site_name: '心理カウンセリングとライフコーチング - Nくん',
        }}
        twitter={{
          handle: '@6209316426525',
          site: '@6209316426525',
          cardType: 'summary_large_image',
        }}
      />

      {/* JSON-LD 構造化データの挿入 */}
      <Head>
        {/* パンクズリスト構造化データ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: breadcrumbItems.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
                item: `https://nshinri.net${item.href}`,
              })),
            }),
          }}
        />
        {/* ContactPage構造化データ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ContactPage',
              name: 'お問い合わせ - Nくん',
              description:
                'Nくんの心理カウンセリングや開発に関するお問い合わせページ',
              url: 'https://nshinri.net/contact',
              contactOption: {
                '@type': 'ContactPoint',
                contactType: 'カスタマーサービス',
                email: 'support@nshinri.net',
              },
            }),
          }}
        />
      </Head>

      <Header />

      <div className={styles.container}>
        {/* パンクズリストの表示 */}
        <nav aria-label="パンくずリスト" className={styles.breadcrumb}>
          <ol>
            <li>
              <Link href="/">トップページ</Link>
            </li>
            <li aria-current="page">お問い合わせ</li>
          </ol>
        </nav>

        <h1 className={styles.heading}>お問い合わせ</h1>
        <p className={styles.intro}>
          ご質問やご相談がある場合は、以下のフォームからお気軽にお問い合わせください。
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              お名前（仮名で可）
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmEmail" className={styles.label}>
              メールアドレス（確認用）
            </label>
            <input
              type="email"
              id="confirmEmail"
              name="confirmEmail"
              value={formData.confirmEmail}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}{' '}
          {/* エラーメッセージの表示 */}
          <div className={styles.formGroup}>
            <label htmlFor="subject" className={styles.label}>
              お問い合わせ件名（50文字以内）
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={styles.input}
              maxLength={50}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>
              お問い合わせ内容（1000文字以内）
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={styles.textarea}
              maxLength={1000}
              required
            ></textarea>
          </div>
          <button type="submit" className={styles.submitButton}>
            送信
          </button>
        </form>

        {isSubmitted && (
          <p className={styles.successMessage}>
            お問い合わせ内容が送信されました。ありがとうございます！
          </p>
        )}
      </div>
    </>
  );
};

export default Contact;
