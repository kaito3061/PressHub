import fetchPressReleases from "@/features/pressreleases/shared/services/fetchPressReleases";
import PressReleaseList from "./PressReleaseList";

export default async function PressReleaseListSection() {
  const pressReleases = await fetchPressReleases();
  console.log(pressReleases);

  return <PressReleaseList pressReleases={pressReleases} />;
}
