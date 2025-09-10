import { Button } from "@/features/shadcn/components/ui/button";
import Link from "next/link";
import { FaArrowLeft, FaEdit } from "react-icons/fa";

interface PreviewHeaderProps {
  title: string;
  pressreleaseId: number;
}

export default function PreviewHeader({ title, pressreleaseId }: PreviewHeaderProps) {
  return (
    <header className="flex items-center justify-between py-4 border-b mb-6">
      <div className="flex items-center justify-center gap-4 ml-4">
        <Link href="/pressreleases" className="text-xl">
          <FaArrowLeft />
        </Link>
        <p className="text-2xl font-bold">掲載物一覧へ</p>
      </div>
      <h1 className="text-2xl font-bold">{title || "プレスリリース プレビュー"}</h1>
      <Button variant="outline" className="text-lg" asChild>
        <Link href={`/pressreleases/${pressreleaseId}/edit`}>
          <FaEdit />
          編集
        </Link>
      </Button>
    </header>
  );
}
