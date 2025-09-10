import { useEffect, useState, useMemo, useCallback } from "react";
import { EditorState, StateEffect, EditorSelection } from "@codemirror/state";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { EditorView, ViewUpdate, keymap, placeholder } from "@codemirror/view";
import { history } from "@codemirror/commands";
import { tags } from "@lezer/highlight";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { EditorSetup } from "../types/editorSetup";

export const useMarkdownEditor = ({ doc, setDoc, savePreview }: EditorSetup) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [editorView, setEditorView] = useState<EditorView | null>(null);
  // Reactのcallback refで常に最新のDOMノードを受け取る
  const editor = useCallback((node: HTMLDivElement | null) => {
    setContainer(node);
  }, []);

  // Editor内のキーマップ設定
  const customKeymap = useMemo(() => {
    return keymap.of([
      {
        // 本文の保存
        key: "Mod-s",
        run() {
          savePreview();
          return true;
        },
      },
    ]);
  }, [savePreview]);

  // editorのrefはcallbackでcontainerに反映するため副作用は不要

  // Editorの状態が更新されたときの処理
  const updateListener = useMemo(() => {
    return EditorView.updateListener.of((update: ViewUpdate) => {
      if (update.docChanged) {
        // エディタのテキストが更新されるたびにdocを更新する
        setDoc(update.state.doc.toString());
      }
    });
  }, [setDoc]);

  // Markdown記法のハイライト設定
  const highlightStyle = HighlightStyle.define([
    { tag: tags.strong, color: "black", fontWeight: "700" }, // 太字
    { tag: tags.quote, color: "#6a737d" }, // 引用
    { tag: tags.emphasis, fontStyle: "italic" }, // 斜体
    { tag: tags.url, textDecoration: "underline" }, // URLに下線をつける
    { tag: tags.strikethrough, textDecoration: "line-through" }, // 打ち消し線（GFM拡張）
  ]);

  const editorStyle = useMemo(() => {
    return EditorView.theme({
      "&": {
        minHeight: "560px",
        height: "100%",
      },
      // editorの外枠
      "&.cm-editor": {
        outline: "none", // エディターの枠線を非表示
        height: "100%",
      },
      // editorの内部
      "&.cm-editor .cm-scroller": {
        fontFamily: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace, 'Segoe UI Emoji'`,
        "-webkit-font-smoothing": "antialiased",
        letterSpacing: "0.03em",
        fontSize: "16px",
        lineHeight: "1.7",
        color: "#000000",
        minHeight: "100%",
      },
      "&.cm-editor .cm-content": {
        minHeight: "100%",
      },
      // 選択範囲の背景色
      ".cm-selectionBackground": {
        backgroundColor: "#036dd626 !important",
      },
    });
  }, []);

  // Editorのextensions
  const extensions = useMemo(() => {
    return [
      placeholder("ここにテキストを入力してください"),
      history(),
      updateListener,
      customKeymap,
      EditorView.scrollMargins.of(() => ({ top: 64, bottom: 16 })),
      EditorView.lineWrapping,
      EditorState.tabSize.of(4),
      editorStyle,
      syntaxHighlighting(highlightStyle),
      markdown({
        base: markdownLanguage,
        completeHTMLTags: false,
      }),
    ];
  }, [customKeymap, updateListener, highlightStyle, editorStyle]);

  // viewを（再）初期化する。containerのマウント/切替時に再作成する
  useEffect(() => {
    if (!container) return;

    const state =
      editorView?.state ??
      EditorState.create({
        doc,
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
  }, [container]);

  // extensionsを更新する
  useEffect(() => {
    if (editorView) {
      editorView.dispatch({ effects: StateEffect.reconfigure.of(extensions) });
    }
  }, [editorView, extensions]);

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

  return {
    editor,
    navigateToLine,
  };
};
