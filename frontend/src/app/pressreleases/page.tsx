import PressReleaseListSection from "@/features/pressreleases/list/components/PressReleaseListSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "掲載物一覧",
};

export default async function CreatePressReleasePage() {
  return (
    <main className="container mx-auto mt-8">
      <PressReleaseListSection />
    </main>
  );
}
