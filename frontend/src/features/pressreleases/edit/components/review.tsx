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
import { aiReviewSections, internalComments } from "@/features/pressreleases/edit/config/review";

const Review = () => {
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
                    3
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
                    <Accordion type="multiple">
                      {aiReviewSections.map((section) => (
                        <AccordionItem key={section.value} value={section.value}>
                          <AccordionTrigger className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                              <span>{section.label}</span>
                            </div>
                            <Badge variant="destructive">{section.count}</Badge>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="mt-2 space-y-3">
                              {section.items.map((i, idx) => (
                                <div
                                  key={idx}
                                  className="rounded-md border border-red-200 bg-red-50 p-3"
                                >
                                  <div className="flex items-center gap-2 text-sm text-red-700">
                                    <span className="inline-flex items-center gap-1">
                                      行{i.line}:
                                    </span>
                                    <span className="font-medium">{i.text}</span>
                                  </div>
                                  <p className="mt-1 text-sm text-red-600">提案: {i.suggest}</p>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
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
