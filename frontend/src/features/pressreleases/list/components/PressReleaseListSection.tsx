import fetchPressReleases from "@/features/pressreleases/shared/services/fetchPressReleases";
import PressReleaseList from "./PressReleaseList";

export default async function PressReleaseListSection() {
  const pressReleases = await fetchPressReleases();

  return <PressReleaseList pressReleases={pressReleases} />;
}
