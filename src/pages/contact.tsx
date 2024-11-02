import React, { useState } from 'react';
import Head from 'next/head';
import styles from './contact.module.css';
import Header from '../components/Header';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.subject.length > 50 || formData.message.length > 1000) {
      alert('件名は50文字以内、内容は1000文字以内にしてください。');
      return;
    }

    // 確認ダイアログの表示
    const isConfirmed = window.confirm(
      '送信してもよろしいですか？'
    );

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
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      alert('送信に失敗しました。再度お試しください。');
    }
  };

  return (
    <>
      <Head>
        <title>お問い合わせ - Nくん</title>
        <meta name="description" content="Nくんの心理カウンセリングとライフコーチングに関するお問い合わせページ。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <div className={styles.container}>
        <h1 className={styles.heading}>お問い合わせ</h1>
        <p className={styles.intro}>
          カウンセリング申し込み前にご質問やご相談がある場合は、以下のフォームからお気軽にお問い合わせください。
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>お名前（仮名で可）</label>
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
            <label htmlFor="email" className={styles.label}>メールアドレス</label>
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
            <label htmlFor="subject" className={styles.label}>お問い合わせ件名（50文字以内）</label>
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
            <label htmlFor="message" className={styles.label}>お問い合わせ内容（1000文字以内）</label>
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

          <button type="submit" className={styles.submitButton}>送信</button>
        </form>

        {isSubmitted && <p className={styles.successMessage}>お問い合わせ内容が送信されました。ありがとうございます！</p>}
      </div>
    </>
  );
};

export default Contact;
