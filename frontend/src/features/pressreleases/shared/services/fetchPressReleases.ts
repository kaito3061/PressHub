import { baseUrl } from "../const/baseUrl";
import { PressReleaseType } from "../types/PressRelease";

/**
 * @description プレスリリース一覧を取得する
 * @returns {Promise<PressReleases[]>} プレスリリース一覧
 */
export default async function fetchPressReleases(): Promise<PressReleaseType[]> {
  const data = await fetch(`${baseUrl}/press_releases/`);
  const pressReleases: PressReleaseType[] = await data.json();

  return pressReleases;
}
