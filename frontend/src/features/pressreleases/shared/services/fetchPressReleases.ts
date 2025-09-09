import { baseUrl } from "../const/baseUrl";
import { PressReleaseType } from "../types/PressRelease";

/**
 * @description プレスリリース一覧を取得し、エラーが発生したら空配列を返す。また、開発環境ならコンソールにエラーを表示
 * @returns {Promise<PressReleases[]>} プレスリリース一覧
 * @returns {[]} 失敗した場合は空配列
 */
export default async function fetchPressReleases(): Promise<PressReleaseType[]> {
  try {
    const data = await fetch(`${baseUrl}/press_releases/`);
    const pressReleases: PressReleaseType[] = await data.json();

    return pressReleases;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("fetchPressReleases error:", error);
    }
    return [];
  }
}
