import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const sendContact = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, email, subject, message } = req.body;

    // メール送信の設定
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Gmailアカウント
        pass: process.env.GMAIL_PASS, // アプリパスワード
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER, // 送信元: あなたのGmailアドレス
      to: process.env.ADMIN_EMAIL, // 宛先: 管理者のメールアドレス (同じGmailでもOK)
      replyTo: email, // 返信先: 顧客の入力したメールアドレス
      subject: `NくんのHPよりお問い合わせ: ${subject}`,
      text: `お名前: ${name}\nメールアドレス: ${email}\n\n${message}`,
    };

    const confirmationOptions = {
      from: process.env.GMAIL_USER, // 送信元: あなたのGmailアドレス
      to: email, // 宛先: 顧客のメールアドレスに確認メールを送信
      subject: 'お問い合わせありがとうございます',
      text: `${name} 様\n\nお問い合わせ内容を受け付けました。\n\n件名: ${subject}\n\n内容:\n${message}\n\n後程回答をいたします。ありがとうございました。`,
    };

    try {
      await transporter.sendMail(mailOptions); // 管理者（あなた）への通知
      await transporter.sendMail(confirmationOptions); // 顧客への確認メール
      res.status(200).json({ message: 'お問い合わせが送信されました' });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: '送信エラーが発生しました', error: error.message });
      } else {
        res.status(500).json({ message: '送信エラーが発生しました' });
      }
    }
  } else {
    res.status(405).json({ message: 'メソッドが許可されていません' });
  }
};

export default sendContact;
