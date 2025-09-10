import { openAiClient } from "@/features/openAi/services/client";
import { promptLoader } from "@/features/openAi/services/promptLoader";
import { fileNameEnum } from "@/features/openAi/types/FileNameEnum";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { doc } = body;
  const prompt = await promptLoader({ fileName: fileNameEnum.publicationCheck });

  if (prompt === undefined) {
    return NextResponse.json(
      { message: "プロンプトを読み取ることができませんでした。" },
      { status: 500 }
    );
  }

  try {
    const completion = await openAiClient.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content:
            "あなたはPR TIMESの社員です。その上で以下のPress Releaseの記事が掲載基準を満たしているか厳しく判断してください。",
        },
        {
          role: "user",
          content: `
          ${prompt}
          \n\n---\n\n以上のpromptをもとに以下のPress Releaseの記事が掲載基準を満たしているか厳しく判断してください。また、基準に満たしていない場合は、満たしていない箇所を教えてください。\n\n---\n\n
          ${doc}`,
        },
      ],
    });

    return NextResponse.json({
      result: completion.choices[0].message?.content,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(`AI Response Error: ${error}`);
    }
    return NextResponse.json({ message: "掲載基準チェックに失敗しました。" }, { status: 500 });
  }
}
