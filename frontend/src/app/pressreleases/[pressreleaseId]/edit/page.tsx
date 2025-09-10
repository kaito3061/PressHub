"use client";

import PressReleaseEditClient from "@/features/pressreleases/edit/components/press-release-edit-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "掲載物一覧",
};

export default function PressReleaseEditPage() {
  return <PressReleaseEditClient />;
}
