/**
 * /care-bridge/posts/[slug] の記事をまとめて管理する1ファイル。
 * 記事を増やすときは careBridgeArticles 配列にオブジェクトを追加。
 */

export type CareBridgeSection = {
  heading: string;
  paragraphs: string[];
};

export type CareBridgeArticleData = {
  slug: string;
  label?: string;
  title: string;
  description: string;
  articleHeadline: string;
  keywords: string[];
  ogImage: string;
  datePublished: string;
  dateModified: string;
  sections: CareBridgeSection[];
};

const careBridgeArticles: CareBridgeArticleData[] = [
  {
    slug: '1',
    label: '設計思想',
    title: '介護記録は「残す」だけでなく「共有」までが本番 | CareBridge',
    description:
      '家族・施設・ケアマネに状況が伝わらないと、介護は前に進みにくい。CareBridge がPDF共有を重視する理由を、現場のバトンタッチ視点で解説します。',
    articleHeadline: '介護記録は「残す」だけでなく「共有」までが本番',
    keywords: [
      '介護記録 共有',
      'PDF 出力',
      '申し送り',
      '家族介護',
      'ケアマネ 連携',
      'CareBridge',
    ],
    ogImage: '/caregiving_app_icon.png',
    datePublished: '2026-04-01',
    dateModified: '2026-04-01',
    sections: [
      {
        heading: '結論：介護記録は「伝わって」初めて価値になる',
        paragraphs: [
          '介護記録をがんばって付けても、家族・施設・ケアマネに伝わらなければ、状況の理解が揃いません。',
          '理解が揃わないと、相談は「その場の印象」に寄りがちになり、ケアプランの改善につながりにくくなります。',
          'CareBridge は、記録を「溜める」だけで終わらせず、共有できる形（PDF）にまとめるところまでを重視します。',
        ],
      },
      {
        heading: 'バトンタッチが難しい理由は、情報が散らばるから',
        paragraphs: [
          '家族内の申し送りが、口頭・メモ・LINEなどに分散すると「いつ・何が起きたか」を後から追いづらくなります。',
          '結果として「結局どれが正しい？」となり、共有する側も受け取る側も疲弊します。',
          'ひとつに集めるだけでなく、渡しやすい形に整えることが重要です。',
        ],
      },
      {
        heading: 'PDF共有という割り切りが、現場との相性がいい',
        paragraphs: [
          '施設やケアマネとのやり取りは、必ずしも同じアプリやアカウントで完結できません。',
          'だからこそ、誰でも受け取れる形（PDF）にまとめて渡せると、連携がスムーズになります。',
          'CareBridge は「みんなにアプリを入れてもらう」前提にせず、共有のハードルを下げる設計にします。',
        ],
      },
    ],
  },
  {
    slug: '2',
    label: '運用',
    title: '申し送りがラクになる「共有テンプレ」の考え方 | CareBridge',
    description:
      '家族・施設・ケアマネに共有するとき、何を書けばいいかが毎回ぶれる問題。最低限そろえる項目と、伝わる順番の作り方をまとめます。',
    articleHeadline: '申し送りがラクになる「共有テンプレ」の考え方',
    keywords: [
      '申し送り テンプレ',
      '介護 共有 項目',
      '介護記録',
      'CareBridge',
    ],
    ogImage: '/caregiving_app_icon.png',
    datePublished: '2026-04-01',
    dateModified: '2026-04-01',
    sections: [
      {
        heading: 'まずは「変化」と「対応」をセットで残す',
        paragraphs: [
          '共有で一番伝えたいのは「いつもと違う点」と「それに対して何をしたか」です。',
          '変化だけを書いて終わると受け手が不安になり、対応だけを書くと背景がわかりません。',
          'この2つをセットにすると、状況把握が速くなります。',
        ],
      },
      {
        heading: '最低限の項目（例）',
        paragraphs: [
          '体調（発熱/痛み/むくみ等）、食事・水分、排泄、睡眠、服薬、連絡事項。',
          'すべてを完璧に書く必要はありません。抜けやすいところだけでも「型」にしておくのがコツです。',
        ],
      },
    ],
  },
];

const bySlug = new Map(careBridgeArticles.map((a) => [a.slug, a]));

export function getCareBridgeArticle(
  slug: string
): CareBridgeArticleData | undefined {
  return bySlug.get(slug);
}

export function getAllCareBridgeSlugs(): string[] {
  return careBridgeArticles.map((a) => a.slug);
}

export function getAllCareBridgeArticles(): CareBridgeArticleData[] {
  return careBridgeArticles;
}

