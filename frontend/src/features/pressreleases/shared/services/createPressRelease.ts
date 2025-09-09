import { baseUrl } from "../const/baseUrl";
import { PressReleaseType } from "../types/PressRelease";

/**
 * @description 新しいPressReleaseを作成
 * @returns {Promise<PressReleaseType | undefined>} 作成したPressReleaseの情報、失敗した場合はundefined
 */
export default async function createPressRelease(): Promise<PressReleaseType | undefined> {
  try {
    console.log(baseUrl);
    const data = await fetch(`${baseUrl}/press_releases/`, {
      method: "POST",
    });

    console.log(data);
    const PressRelease = await data.json();
    if (PressRelease.id === undefined) {
      throw new Error("PressRelease ID is undefined");
    }

    return PressRelease;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("createPressRelease error:", error);
    }
    return undefined;
  }
}
