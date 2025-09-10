"use client";
import { useState, useCallback, useMemo } from "react";
import { EditorView, ViewUpdate } from "@codemirror/view";

// エディターの状態管理
export const useEditorState = (doc: string, setDoc: (doc: string) => void) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [editorView, setEditorView] = useState<EditorView | null>(null);

  // Reactのcallback refで常に最新のDOMノードを受け取る
  const editor = useCallback((node: HTMLDivElement | null) => {
    setContainer(node);
  }, []);

  // Editorの状態が更新されたときの処理
  const updateListener = useMemo(() => {
    return EditorView.updateListener.of((update: ViewUpdate) => {
      if (update.docChanged) {
        setDoc(update.state.doc.toString());
      }
    });
  }, []); // setDocを依存配列から削除

  return {
    container,
    editorView,
    setEditorView,
    editor,
    updateListener,
  };
};
