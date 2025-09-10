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
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [article, setArticle] = useState({
    title: "",
    content: "",
  });

  const saveArticle = useCallback(async () => {
    if (isSaving) return;

    setIsSaving(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/press-releases/new`, {
        method: "POST",
        body: JSON.stringify({
          title: article.title,
          content: article.content,
        }),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  }, [article.title, article.content, isSaving]);

  const savePreview = useCallback(() => {
    saveArticle();
  }, [saveArticle]);

  // 入力の最終操作から0.5秒後に自動保存
  const debouncedAutoSave = useDebouncedCallback(() => {
    saveArticle();
  }, 5);

  useEffect(() => {
    debouncedAutoSave();
    return () => {
      debouncedAutoSave.cancel();
    };
  }, [article.title, article.content, debouncedAutoSave]);

  const { editor, navigateToLine } = useMarkdownEditor({
    content: article.content,
    setContent: (content) => setArticle({ ...article, content: content }),
    savePreview,
  });

  return (
    <div className="flex flex-col h-screen">
      <Header
        title={article.title}
        content={article.content}
        isSaving={isSaving}
        onSave={saveArticle}
      />
      <div className="flex h-full flex-1">
        <LeftSidebar content={article.content} onJump={(line) => navigateToLine(line)} />
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
            <Preview html={markdownHtml(article.title + "\n" + article.content)} />
          )}
        </div>
        <RightSidebar isEdit={isEdit} onToggle={setIsEdit} />
      </div>
    </div>
  );
}
