"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import markdownHtml from "zenn-markdown-html";
import "zenn-content-css";

import { useMarkdownEditor } from "@/features/press-release/new/hooks/useMarkdownEditor";
import { Preview } from "@/features/press-release/new/components/preview";

export default function NewPressReleasePage() {
  const [doc, setDoc] = useState<string>("");
  const [html, setHtml] = useState<string>("");
  const [view, setView] = useState<"edit" | "preview" | "both">("edit");

  useEffect(() => {
    import("zenn-embed-elements");
  }, []);

  const save = useCallback(() => {
    const html = markdownHtml(doc);
    setHtml(html);
  }, [doc]);

  // 入力の最終操作から0.5秒後に自動保存
  const debouncedAutoSave = useDebouncedCallback(() => {
    const html = markdownHtml(doc);
    setHtml(html);
  }, 0.5);

  useEffect(() => {
    debouncedAutoSave();
    return () => {
      debouncedAutoSave.cancel();
    };
  }, [doc, debouncedAutoSave]);

  const { editor } = useMarkdownEditor({
    doc,
    setDoc,
    save,
  });

  return (
    <div className="flex flex-col h-screen mx-[15vw] my-[5vh]">
      <div className="pt-4 flex justify-end">
        <button onClick={save} className="rounded bg-blue-500 px-4 py-2 text-white">
          保存
        </button>
      </div>
      {/* 表示モードの切替 */}
      <div className="flex justify-end">
        <div className="cursor-pointer rounded-md p-2 flex gap-5">
          <button
            onClick={() => setView("edit")}
            className={
              view === "edit" ? "bg-gray-500 text-white px-4 py-2" : "bg-gray-200 px-4 py-2"
            }
          >
            編集
          </button>
          <button
            onClick={() => setView("preview")}
            className={
              view === "preview" ? "bg-gray-500 text-white px-4 py-2" : "bg-gray-200 px-4 py-2"
            }
          >
            プレビュー
          </button>
          <button
            onClick={() => setView("both")}
            className={
              view === "both" ? "bg-gray-500 text-white px-4 py-2" : "bg-gray-200 px-4 py-2"
            }
          >
            両方
          </button>
        </div>
      </div>

      {view === "edit" && (
        <div className="flex h-full">
          <div ref={editor} className="h-full w-full border"></div>
        </div>
      )}

      {view === "preview" && (
        <div className="flex h-full">
          <div className="h-full w-full border">
            <Preview html={html} />
          </div>
        </div>
      )}

      {view === "both" && (
        <div className="flex h-full">
          <div ref={editor} className="h-full w-1/2 border"></div>
          <div className="h-full w-1/2 border">
            <Preview html={html} />
          </div>
        </div>
      )}
    </div>
  );
}
