import { baseUrl } from "../const/baseUrl";
import { PressReleaseType } from "../types/PressRelease";

interface fetchPressReleaseByIdProps {
  id: number;
}

export default async function fetchPressReleaseById({
  id,
}: fetchPressReleaseByIdProps): Promise<PressReleaseType | undefined> {
  try {
    const data = await fetch(`${baseUrl}/press_releases/${id}`);
    const pressReleases: PressReleaseType = await data.json();

    return pressReleases;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("fetchPressReleases error:", error);
    }
    return undefined;
  }
}
