"use client";
import { useCallback } from "react";
import { EditorSelection } from "@codemirror/state";
import { EditorView } from "@codemirror/view";

// エディターの操作を管理
export const useEditorActions = (editorView: EditorView | null) => {
  // 指定された行に移動する
  const navigateToLine = useCallback(
    (lineNumber: number) => {
      if (!editorView) return;
      const max = editorView.state.doc.lines;
      const safeLine = Math.max(1, Math.min(lineNumber, max));
      const line = editorView.state.doc.line(safeLine);
      editorView.dispatch({
        selection: EditorSelection.cursor(line.from),
        effects: EditorView.scrollIntoView(line.from, { y: "start" }),
      });
      editorView.focus();
    },
    [editorView]
  );

  // 最下行に移動する
  const navigateToEnd = useCallback(() => {
    if (!editorView) return;
    const doc = editorView.state.doc;
    const lastLine = doc.line(doc.lines);
    const endPosition = lastLine.to;

    editorView.dispatch({
      selection: EditorSelection.cursor(endPosition),
      effects: EditorView.scrollIntoView(endPosition, { y: "center" }),
    });
    editorView.focus();
  }, [editorView]);

  return {
    navigateToLine,
    navigateToEnd,
  };
};
