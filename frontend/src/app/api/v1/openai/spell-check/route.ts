import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { SpellCheckResult } from "@/features/openai/types/spellCheckResult";
import { readFileSync } from "fs";
import { join } from "path";

// プロンプトファイルを読み込み
const getSystemPrompt = () => {
  try {
    const promptPath = join(process.cwd(), "src/features/openai/prompts/spellCheckPrompt.md");
    return readFileSync(promptPath, "utf-8");
  } catch (error) {
    console.error("プロンプトファイルの読み込みに失敗:", error);
    // フォールバック用のプロンプト
    return `あなたは日本語の文章を校正するエキスパートです。誤字脱字、文法的な誤りを検出し、JSON形式で結果を返してください。`;
  }
};

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: "テキストが提供されていません。" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OpenAI APIキーが設定されていません。" }, { status: 500 });
    }

    const openai = new OpenAI({ apiKey });

    const systemPrompt = getSystemPrompt();

    const response = await openai.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `以下のテキストを校正し、指定されたJSON形式で結果を返してください。\n\n${text}`,
        },
      ],
      response_format: zodResponseFormat(SpellCheckResult, "spellCheckResult"),
    });

    const result = response.choices[0].message.content;
    console.log("校正結果:", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("校正API エラー:", error);
    return NextResponse.json({ error: "校正処理中にエラーが発生しました。" }, { status: 500 });
  }
}
