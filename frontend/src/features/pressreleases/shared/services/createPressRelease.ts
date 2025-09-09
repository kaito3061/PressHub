import { baseUrl } from "../const/baseUrl";
import { PressReleaseType } from "../types/PressRelease";

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
