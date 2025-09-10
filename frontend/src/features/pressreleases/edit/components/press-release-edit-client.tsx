"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import markdownHtml from "zenn-markdown-html";

import { useMarkdownEditor } from "@/features/pressreleases/edit/hooks/useMarkdownEditor";
import { Preview } from "@/features/pressreleases/shared/components/preview";
import Header from "@/features/pressreleases/edit/components/header";
import LeftSidebar from "@/features/pressreleases/edit/components/leftSidebar";
import RightSidebar from "@/features/pressreleases/edit/components/rightSidebar";
import { SpellCheckProvider } from "@/features/pressreleases/edit/context/spellCheckContext";
import useSaveArticle from "@/features/pressreleases/edit/hooks/useEditSave";

function PressReleaseEditContent() {
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [article, setArticle] = useState({
    title: "",
    subtitle: "",
    content: "",
  });
  const { saveArticle, isSaving } = useSaveArticle(article.title, article.content);

  const savePreview = useCallback(() => {
    saveArticle();
  }, [article.content, article.title]);

  // 入力の最終操作から0.5秒後に自動保存
  const debouncedAutoSave = useDebouncedCallback(() => {
    saveArticle();
  }, 0.5);

  useEffect(() => {
    debouncedAutoSave();
    return () => {
      debouncedAutoSave.cancel();
    };
  }, [article.content, debouncedAutoSave]);

  const setContent = useCallback((content: string) => {
    setArticle((prev) => ({ ...prev, content }));
  }, []);

  const { editor, navigateToLine, navigateToEnd } = useMarkdownEditor({
    content: article.content,
    setContent,
    savePreview,
  });

  return (
    <div className="flex flex-col">
      <Header
        title={article.title}
        content={article.content}
        isSaving={isSaving}
        onSave={saveArticle}
      />
      <div className="flex h-full flex-1">
        <LeftSidebar content={article.content} onJump={(line) => navigateToLine(line)} />
        {/* メインコンテンツエリア */}
        <div className="h-full w-full relative">
          {isEdit ? (
            <div className="h-full bg-gray-50 flex flex-col">
              <div className="mx-8 pt-10 flex-1">
                <input
                  className="w-full text-4xl font-bold tracking-wider focus:outline-none bg-transparent"
                  placeholder="リリースタイトルを入力"
                  value={article.title}
                  onChange={(e) => setArticle({ ...article, title: e.target.value })}
                />
                <div ref={editor} className="mt-10" />
              </div>
              {/* クリック可能な下部余白 */}
              <div
                className="sticky bottom-0 h-8 bg-gray-50 hover:bg-gray-100 cursor-pointer flex items-center justify-center text-gray-400 hover:text-gray-600 border-t border-gray-200"
                onClick={navigateToEnd}
                title="クリックして最下行に移動"
              >
                <div className="text-sm">↓ クリックして最下行に移動 ↓</div>
              </div>
            </div>
          ) : (
            <div className="m-10">
              <Preview html={markdownHtml(article.title + "\n" + article.content)} />
            </div>
          )}
        </div>
        <RightSidebar
          title={article.title}
          content={article.content}
          isEdit={isEdit}
          onToggle={setIsEdit}
          navigateToLine={navigateToLine}
        />
      </div>
    </div>
  );
}

export default function PressReleaseEditClient() {
  return (
    <SpellCheckProvider>
      <PressReleaseEditContent />
    </SpellCheckProvider>
  );
}
