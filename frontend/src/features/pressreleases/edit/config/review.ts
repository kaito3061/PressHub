export type ReviewItem = { line: number; text: string; suggest: string };
export type ReviewSection = { value: string; label: string; count: number; items: ReviewItem[] };

export const aiReviewSections: ReviewSection[] = [
  {
    value: "spelling",
    label: "誤字脱字",
    count: 3,
    items: [
      { line: 3, text: '"効果的な"', suggest: "効果的な" },
      { line: 3, text: '"コンテンツ"', suggest: "コンテンツ" },
      { line: 3, text: '"について"', suggest: "について" },
    ],
  },
  {
    value: "grammar",
    label: "文法チェック",
    count: 2,
    items: [
      { line: 5, text: "主語と述語が不一致です", suggest: "主語と述語を一致させる" },
      { line: 12, text: "冗長な表現があります", suggest: "簡潔な表現にする" },
    ],
  },
  {
    value: "rights",
    label: "著作権・肖像権",
    count: 1,
    items: [{ line: 20, text: "画像の出典が未記載です", suggest: "キャプションに出典を追記" }],
  },
  {
    value: "facts",
    label: "事実確認",
    count: 2,
    items: [
      { line: 7, text: "統計値の出典が不明です", suggest: "脚注にソースURLを記載" },
      { line: 9, text: "引用の原典リンクがありません", suggest: "引用元へのリンクを追加" },
    ],
  },
  {
    value: "seo",
    label: "SEO最適化",
    count: 2,
    items: [
      { line: 2, text: "見出しに主要キーワードが不足", suggest: "H2にキーワードを追加" },
      { line: 18, text: "画像のalt属性が未設定", suggest: "意味のあるaltを設定" },
    ],
  },
  {
    value: "readability",
    label: "読みやすさ",
    count: 2,
    items: [
      { line: 6, text: "1文が長すぎます", suggest: "40字程度に分割" },
      { line: 14, text: "段落内に要点が複数あります", suggest: "要点を1つに絞る" },
    ],
  },
];

export type InternalComment = {
  author: string;
  time: string;
  body: string;
};

export const internalComments: InternalComment[] = [
  {
    author: "田中さん",
    time: "2分前",
    body: "導入部分がとても良いですね。もう少し具体例があると読者により伝わりやすくなると思います。",
  },
  {
    author: "佐藤さん",
    time: "15分前",
    body: "画像の配置が効果的ですね。キャプションも分かりやすいです。",
  },
];
