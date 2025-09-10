import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface PublicationCheckResult {
  /** 新規情報の包含 */
  newInformation: {
    status: "PASS" | "FAIL";
    violations?: string[];
  };
  /** 発信主体と登録企業の関係性 */
  senderRelationship: {
    status: "PASS" | "FAIL";
    violations?: string[];
  };
  /** 誤字脱字 */
  typos: {
    status: "PASS" | "FAIL";
    violations?: string[];
  };
  /** 誹謗中傷・差別表現 */
  discrimination: {
    status: "PASS" | "FAIL";
    violations?: string[];
  };
  /** 法令違反 */
  legalViolations: {
    status: "PASS" | "FAIL";
    violations?: string[];
  };
  /** メディア掲載実績 */
  mediaCoverage: {
    status: "PASS" | "FAIL";
    violations?: string[];
  };
  /** 商品再販 */
  productResale: {
    status: "PASS" | "FAIL";
    violations?: string[];
  };
  /** 調査レポート */
  surveyReport: {
    status: "PASS" | "FAIL";
    violations?: string[];
  };
  /** 婚活イベント */
  marriageEvent: {
    status: "PASS" | "FAIL";
    violations?: string[];
  };
  /** ビフォー・アフター画像 */
  beforeAfterImages: {
    status: "PASS" | "FAIL";
    violations?: string[];
  };
  /** 性的表現画像 */
  sexualContent: {
    status: "PASS" | "FAIL";
    violations?: string[];
  };
  /** 医療・美容系業種 */
  medicalBeauty: {
    status: "PASS" | "FAIL";
    violations?: string[];
  };
  /** 総合判定 */
  overallResult: {
    status: "PASS" | "FAIL";
    summary: string;
  };
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { doc } = body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `あなたはPR TIMESの社員です。以下のPress Releaseの記事が掲載基準を満たしているか厳しく判断し、指定されたJSON形式で結果を返してください。

返却形式：
{
  "newInformation": { "status": "PASS" | "FAIL", "violations": ["違反内容1", "違反内容2"] },
  "senderRelationship": { "status": "PASS" | "FAIL", "violations": ["違反内容1"] },
  "typos": { "status": "PASS" | "FAIL", "violations": ["誤字脱字の具体例"] },
  "discrimination": { "status": "PASS" | "FAIL", "violations": ["差別表現の具体例"] },
  "legalViolations": { "status": "PASS" | "FAIL", "violations": ["法令違反の具体例"] },
  "mediaCoverage": { "status": "PASS" | "FAIL", "violations": ["メディア掲載実績の記載"] },
  "productResale": { "status": "PASS" | "FAIL", "violations": ["再販に関する記載"] },
  "surveyReport": { "status": "PASS" | "FAIL", "violations": ["調査レポートの記載"] },
  "marriageEvent": { "status": "PASS" | "FAIL", "violations": ["婚活イベントの記載"] },
  "beforeAfterImages": { "status": "PASS" | "FAIL", "violations": ["ビフォーアフター画像の記載"] },
  "sexualContent": { "status": "PASS" | "FAIL", "violations": ["性的表現の記載"] },
  "medicalBeauty": { "status": "PASS" | "FAIL", "violations": ["医療美容系の記載"] },
  "overallResult": { "status": "PASS" | "FAIL", "summary": "総合的な判定理由" }
}

各項目で違反がない場合は "violations" は空配列または省略してください。`,
        },
        {
          role: "user",
          content: `以下のPress Releaseの記事を評価し、上記のJSON形式で結果を返してください：

${doc}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(
      completion.choices[0].message?.content || "{}"
    ) as PublicationCheckResult;

    return NextResponse.json({
      result,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(`AI Response Error: ${error}`);
    }
    return NextResponse.json({ message: "掲載基準チェックに失敗しました。" }, { status: 500 });
  }
}
