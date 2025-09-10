import CommentSection from "@/features/pressreleases/preview/components/CommentSection";
import PreviewHeader from "@/features/pressreleases/preview/components/PreviewHeader";
import { Preview } from "@/features/pressreleases/shared/components/preview";
import fetchPressReleaseById from "@/features/pressreleases/shared/services/fetchPressReleaseById";
import { Metadata } from "next";
import markdownToHtml from "zenn-markdown-html";

interface PressReleasePreviewProps {
  params: {
    pressreleaseId: string;
  };
}

export const metadata: Metadata = {
  title: "掲載物詳細",
};

export default async function PressReleasePreview({ params }: PressReleasePreviewProps) {
  const { pressreleaseId: id } = await params;
  const pressreleaseId = Number(id);
  const pressrelease = await fetchPressReleaseById({ id: pressreleaseId });
  const title = pressrelease?.title || "";
  const content = pressrelease?.content || "";
  const html = markdownToHtml(`${title}\n${content}`);

  return (
    <div className="container mx-auto px-4">
      <PreviewHeader title={title} pressreleaseId={pressreleaseId} />
      <main className="">
        <section className="prose max-w-none break-words whitespace-pre-wrap border border-gray-800 rounded-md min-h-40 px-2 pt-2 pb-4">
          <Preview html={html} />
        </section>
        <section>
          <CommentSection pressreleaseId={pressreleaseId} />
        </section>
      </main>
    </div>
  );
}
