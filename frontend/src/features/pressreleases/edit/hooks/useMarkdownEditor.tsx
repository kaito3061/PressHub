import { useEffect, useMemo } from "react";
import { EditorState, StateEffect } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { EditorSetup } from "../types/editorSetup";
import { useEditorState } from "./useEditorState";
import { useEditorActions } from "./useEditorActions";
import { createEditorKeymap } from "../config/editorKeymaps";
import { createEditorExtensions } from "../config/editorExtensions";

export const useMarkdownEditor = ({ content, setContent, savePreview }: EditorSetup) => {
  // エディターの状態管理
  const { container, editorView, setEditorView, editor, updateListener } = useEditorState(
    content,
    setContent
  );

  // エディターの操作
  const { navigateToLine, navigateToEnd } = useEditorActions(editorView);

  // キーマップ設定
  const customKeymap = useMemo(() => createEditorKeymap(savePreview), [savePreview]);

  // エディターの拡張機能
  const extensions = useMemo(
    () => createEditorExtensions(updateListener, customKeymap),
    [updateListener, customKeymap]
  );

  // viewを（再）初期化する。containerのマウント/切替時に再作成する
  useEffect(() => {
    if (!container) return;

    const state = EditorState.create({
      doc: content,
      extensions: [updateListener],
    });

    if (editorView) {
      editorView.destroy();
    }

    const nextView = new EditorView({ state, parent: container });
    setEditorView(nextView);

    return () => {
      nextView.destroy();
    };
  }, [container, updateListener]);

  // extensionsを更新する
  useEffect(() => {
    if (editorView) {
      editorView.dispatch({ effects: StateEffect.reconfigure.of(extensions) });
    }
  }, [editorView, extensions]);

  return {
    editor,
    navigateToLine,
    navigateToEnd,
  };
};
