import React from "react";
import { FaListCheck } from "react-icons/fa6";
import { Button } from "@/features/shadcn/components/ui/button";
import { Badge } from "@/features/shadcn/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/features/shadcn/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/features/shadcn/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/features/shadcn/components/ui/accordion";
import { ScrollArea } from "@/features/shadcn/components/ui/scroll-area";
import { internalComments } from "@/features/pressreleases/edit/config/review";
import { useSpellCheckContext } from "../context/spellCheckContext";

const Review = () => {
  const { state } = useSpellCheckContext();
  const latestSpellCheckResult = state.latestResult;
  const originalText = state.originalText;

  console.log("Review - 現在の校正結果:", latestSpellCheckResult);
  console.log("Review - 状態:", state);

  // 各行の文字範囲を取得する関数
  const getLineRanges = (text: string) => {
    const lines = text.split("\n");
    const ranges: { start: number; end: number; lineNumber: number }[] = [];
    let currentIndex = 0;

    lines.forEach((line, index) => {
      const start = currentIndex;
      const end = currentIndex + line.length;
      ranges.push({
        start,
        end,
        lineNumber: index + 1,
      });
      currentIndex = end + 1;
    });

    return ranges;
  };

  // 文字インデックスから正確な行番号を取得する関数
  const getAccurateLineNumber = (text: string, charIndex: number): number => {
    const lineRanges = getLineRanges(text);
    const range = lineRanges.find((r) => charIndex >= r.start && charIndex <= r.end);
    return range ? range.lineNumber : 1;
  };

  // 校正結果をカテゴリ別に分類
  const categorizeSpellCheckResults = (result: NonNullable<typeof latestSpellCheckResult>) => {
    const messages = result.messages || [];
    const categories = {
      typo: messages.filter((msg) => msg.ruleId === "typo"),
      grammar: messages.filter((msg) => msg.ruleId === "grammar"),
    };
    return categories;
  };

  const spellCheckCategories = latestSpellCheckResult
    ? categorizeSpellCheckResults(latestSpellCheckResult)
    : { typo: [], grammar: [] };

  const totalSpellCheckCount = Object.values(spellCheckCategories).reduce(
    (sum, items) => sum + items.length,
    0
  );

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <button
            type="button"
            className="rounded-full border border-gray-300 text-gray-600 w-10 h-10 flex items-center justify-center hover:bg-gray-50 cursor-pointer"
            aria-label="レビューを開く"
          >
            <FaListCheck />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[420px] sm:w-[460px]">
          <SheetHeader>
            <SheetTitle className="mt-4 ml-3 text-2xl">レビュー</SheetTitle>
          </SheetHeader>

          <div className="mt-4 p-4">
            <Tabs defaultValue="checklist" className="w-full">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="checklist" className="flex items-center gap-2">
                  AIレビュー
                  <Badge variant="secondary" className="ml-1">
                    {totalSpellCheckCount}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="comments" className="flex items-center gap-2">
                  社内レビュー
                  <Badge variant="secondary" className="ml-1">
                    2
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="checklist" className="mt-4">
                <ScrollArea className="h-[70vh] pr-3">
                  <div className="space-y-4">
                    {totalSpellCheckCount > 0 ? (
                      <Accordion type="multiple">
                        {/* 誤字脱字 */}
                        {spellCheckCategories.typo.length > 0 && (
                          <AccordionItem value="typo">
                            <AccordionTrigger className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-2">
                                <span>誤字脱字</span>
                              </div>
                              <Badge variant="destructive">
                                {spellCheckCategories.typo.length}
                              </Badge>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="mt-2 space-y-3">
                                {spellCheckCategories.typo.map((item, idx) => {
                                  const lineNumber = getAccurateLineNumber(
                                    originalText || "",
                                    item.range[0]
                                  );
                                  return (
                                    <div
                                      key={idx}
                                      className="rounded-md border border-red-200 bg-red-50 p-3"
                                    >
                                      <div className="flex items-center gap-2 text-sm text-red-700">
                                        <span className="font-medium">{item.message}</span>
                                      </div>
                                      {item.fix && (
                                        <p className="mt-1 text-sm text-red-600">
                                          修正案: {item.fix.text}
                                        </p>
                                      )}
                                      <p className="mt-1 text-xs text-red-500">
                                        行数: {lineNumber}行目
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        )}

                        {/* 文法エラー */}
                        {spellCheckCategories.grammar.length > 0 && (
                          <AccordionItem value="grammar">
                            <AccordionTrigger className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-2">
                                <span>文法エラー</span>
                              </div>
                              <Badge variant="destructive">
                                {spellCheckCategories.grammar.length}
                              </Badge>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="mt-2 space-y-3">
                                {spellCheckCategories.grammar.map((item, idx) => {
                                  const lineNumber = getAccurateLineNumber(
                                    originalText || "",
                                    item.range[0]
                                  );
                                  return (
                                    <div
                                      key={idx}
                                      className="rounded-md border border-orange-200 bg-orange-50 p-3"
                                    >
                                      <div className="flex items-center gap-2 text-sm text-orange-700">
                                        <span className="font-medium">{item.message}</span>
                                      </div>
                                      {item.fix && (
                                        <p className="mt-1 text-sm text-orange-600">
                                          修正案: {item.fix.text}
                                        </p>
                                      )}
                                      <p className="mt-1 text-xs text-orange-500">
                                        行数: {lineNumber}行目
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        )}
                      </Accordion>
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        校正結果がありません。まず校正を実行してください。
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="comments" className="mt-4">
                <ScrollArea className="h-[70vh] pr-3 space-y-4">
                  {internalComments.map((c, idx) => (
                    <div key={idx} className="rounded-lg border p-3 space-y-2">
                      <div className="text-sm text-gray-500">
                        {c.author} ・ {c.time}
                      </div>
                      <p className="text-sm mt-1">{c.body}</p>
                      <div className="flex gap-2 pt-1">
                        <Button size="sm" variant="secondary">
                          完了
                        </Button>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Review;
