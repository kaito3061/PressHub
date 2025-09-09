interface PublicationCheckProps {
  doc: string;
}

/**
 * @description Markdownに対して掲載基準を満たしてるか判断する関数
 * @param {doc} 掲載基準チェックを行うMarkdown Text
 * @returns {string|undefined} チェックの結果またはエラー時はundefinedを返す
 */
export async function publicationCheck({
  doc,
}: PublicationCheckProps): Promise<string | undefined> {
  try {
    const response = await fetch("/api/v1/openAi/publication-check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ doc }),
    });

    const data = await response.json();
    const { result } = data;

    return result;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(`publicationCheck error: ${error}`);
    }
  }
}
