import { SpellCheckResultType } from "../types/spellCheckResult";

export const spellCheck = async (text: string) => {
  if (!text || text.trim().length === 0) {
    throw new Error("校正するテキストがありません。");
  }

  try {
    const response = await fetch("/api/v1/openai/spell-check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "校正処理中にエラーが発生しました。");
    }

    const result: SpellCheckResultType = await response.json();
    console.log("APIから受信した生データ:", result);

    if (typeof result === "string") {
      const parsedResult = JSON.parse(result);
      console.log("パース後の結果:", parsedResult);
      return parsedResult;
    }

    return result;
  } catch (error) {
    console.error("校正エラー:", error);
    throw error instanceof Error ? error : new Error("校正処理中にエラーが発生しました。");
  }
};
