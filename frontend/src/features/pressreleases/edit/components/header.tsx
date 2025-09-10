import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { FaFlagCheckered } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { Button } from "@/features/shadcn/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/features/shadcn/components/ui/dialog";
import { Badge } from "@/features/shadcn/components/ui/badge";
import { PublicationCheckResult } from "@/app/api/v1/openAi/publication-check/route";
import { useState } from "react";

const Header = ({
  title,
  content,
  isSaving,
  onSave,
}: {
  title: string;
  content: string;
  isSaving: boolean;
  onSave: () => void;
}) => {
  const [checkResult, setCheckResult] = useState<PublicationCheckResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handlePublicationCheck = async () => {
    setIsChecking(true);
    try {
      const response = await fetch("/api/v1/openai/publication-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doc: `# ${title}\n\n${content}`,
        }),
      });
      const data = await response.json();
      setCheckResult(data.result);
    } catch (error) {
      console.error("Publication check failed:", error);
    } finally {
      setIsChecking(false);
    }
  };

  const getStatusBadge = (status: "PASS" | "FAIL") => {
    return (
      <Badge variant={status === "PASS" ? "default" : "destructive"}>
        {status === "PASS" ? "合格" : "不合格"}
      </Badge>
    );
  };

  const renderCheckItem = (
    label: string,
    item: { status: "PASS" | "FAIL"; violations?: string[] }
  ) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-medium">{label}</span>
        {getStatusBadge(item.status)}
      </div>
      {item.violations && item.violations.length > 0 && (
        <div className="ml-4 space-y-1">
          <p className="text-sm text-red-600 font-medium">違反内容:</p>
          <ul className="text-sm text-gray-600 list-disc list-inside">
            {item.violations.map((violation, index) => (
              <li key={index}>{violation}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-20 max-h-16">
      <div className="flex items-center justify-center gap-4 ml-4">
        <Link href="/pressreleases" className="text-xl">
          <FaArrowLeft />
        </Link>
        <p className="text-xl font-bold">掲載物一覧へ</p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={handlePublicationCheck} disabled={isChecking}>
              <FaFlagCheckered />
              {isChecking ? "チェック中..." : "最終チェック"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>PR TIMES 掲載基準チェック結果</DialogTitle>
              <DialogDescription>プレスリリースの掲載基準をチェックした結果です</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {checkResult ? (
                <>
                  {/* 総合判定 */}
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">総合判定</h3>
                      {getStatusBadge(checkResult.overallResult.status)}
                    </div>
                    <p className="text-sm text-gray-700">{checkResult.overallResult.summary}</p>
                  </div>

                  {/* 各項目の詳細 */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">詳細チェック項目</h3>
                    <div className="grid gap-4">
                      {renderCheckItem("新規情報の包含", checkResult.newInformation)}
                      {renderCheckItem(
                        "発信主体と登録企業の関係性",
                        checkResult.senderRelationship
                      )}
                      {renderCheckItem("誤字脱字", checkResult.typos)}
                      {renderCheckItem("誹謗中傷・差別表現", checkResult.discrimination)}
                      {renderCheckItem("法令違反", checkResult.legalViolations)}
                      {renderCheckItem("メディア掲載実績", checkResult.mediaCoverage)}
                      {renderCheckItem("商品再販", checkResult.productResale)}
                      {renderCheckItem("調査レポート", checkResult.surveyReport)}
                      {renderCheckItem("婚活イベント", checkResult.marriageEvent)}
                      {renderCheckItem("ビフォー・アフター画像", checkResult.beforeAfterImages)}
                      {renderCheckItem("性的表現画像", checkResult.sexualContent)}
                      {renderCheckItem("医療・美容系業種", checkResult.medicalBeauty)}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">チェックを実行してください</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">閉じる</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button onClick={onSave} disabled={isSaving}>
          <FiSave />
          {isSaving ? "保存中..." : "保存"}
        </Button>
      </div>
    </div>
  );
};

export default Header;
