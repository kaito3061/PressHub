"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import markdownHtml from "zenn-markdown-html";

import { useMarkdownEditor } from "@/features/pressreleases/edit/hooks/useMarkdownEditor";
import { Preview } from "@/features/pressreleases/edit/components/preview";
import Header from "@/features/pressreleases/edit/components/header";
import LeftSidebar from "@/features/pressreleases/edit/components/leftSidebar";
import RightSidebar from "@/features/pressreleases/edit/components/rightSidebar";

export default function PressReleaseEditPage() {
  const [html, setHtml] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [canSave, setCanSave] = useState<boolean>(false);
  const [article, setArticle] = useState({
    title: "",
    subtitle: "",
    doc: "",
  });
  const savePreview = useCallback(() => {
    const html = markdownHtml(article.title + "\n" + article.doc);
    setHtml(html);
    setCanSave(true);
    console.log(article.title + "\n" + article.doc);
  }, [article.doc, article.title]);

  // 入力の最終操作から0.5秒後に自動保存
  const debouncedAutoSave = useDebouncedCallback(() => {
    const html = markdownHtml(article.title + "\n" + article.doc);
    setHtml(html);
  }, 0.5);

  useEffect(() => {
    debouncedAutoSave();
    return () => {
      debouncedAutoSave.cancel();
    };
  }, [article.doc, debouncedAutoSave]);

  const { editor, navigateToLine } = useMarkdownEditor({
    doc: article.doc,
    setDoc: (doc) => setArticle({ ...article, doc }),
    savePreview,
  });

  return (
    <div className="flex flex-col h-screen">
      <Header canSave={canSave} doc={article.doc} />
      <div className="flex h-full flex-1">
        <LeftSidebar doc={article.doc} onJump={(line) => navigateToLine(line)} />
        {/* メインコンテンツエリア */}
        <div className="h-full w-full">
          {isEdit ? (
            <div className="ml-8 mt-10">
              <input
                className="w-full text-4xl font-bold tracking-wider focus:outline-none"
                placeholder="リリースタイトルを入力"
                value={article.title}
                onChange={(e) => setArticle({ ...article, title: e.target.value })}
              />
              <div ref={editor} className="mt-10" />
            </div>
          ) : (
            <Preview html={html} />
          )}
        </div>
        <RightSidebar doc={article.doc} isEdit={isEdit} onToggle={setIsEdit} />
      </div>
    </div>
  );
}
