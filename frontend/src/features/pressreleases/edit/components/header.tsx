import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { FaFlagCheckered } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { Button } from "@/features/shadcn/components/ui/button";

const Header = ({
  isSaving,
  onSave,
}: {
  title: string;
  content: string;
  isSaving: boolean;
  onSave: () => void;
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-20 max-h-16">
      <div className="flex items-center justify-center gap-4 ml-4">
        <Link href="/" className="text-xl">
          <FaArrowLeft />
        </Link>
        <p className="text-xl font-bold">記事一覧へ</p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button variant="outline">
          <FaFlagCheckered />
          最終チェック
        </Button>
        <Button onClick={onSave} disabled={isSaving}>
          <FiSave />
          {isSaving ? "保存中..." : "保存"}
        </Button>
      </div>
    </div>
  );
};

export default Header;
