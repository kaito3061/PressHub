import { readFile } from "fs/promises";
import path from "path";

interface promptLoaderProps {
  fileName: string;
}

/**
 * @description 任意のopenAiのpromptデータを取得する機能
 * @param {fileName} promptの内容が書いてあるFileName
 * @returns {string|undefined} ファイルの中身
 * @returns {undefined} エラーが発生した時のreturn
 */
export async function promptLoader({ fileName }: promptLoaderProps): Promise<string | undefined> {
  const promptPath = path.join(process.cwd(), "src/features/openAi/prompts", fileName);
  try {
    return await readFile(promptPath, "utf-8");
  } catch {
    if (process.env.NODE_ENV === "development") {
      console.error("ファイルの読み込みに失敗しました");
    }
  }
}
