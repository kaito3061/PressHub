import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { EditorView } from "@codemirror/view";
import { tags } from "@lezer/highlight";
import { EditorState } from "@codemirror/state";

// Markdown記法のハイライト設定
export const highlightStyle = HighlightStyle.define([
  { tag: tags.strong, color: "black", fontWeight: "700" }, // 太字
  { tag: tags.quote, color: "#6a737d" }, // 引用
  { tag: tags.emphasis, fontStyle: "italic" }, // 斜体
  { tag: tags.url, textDecoration: "underline" }, // URLに下線をつける
  { tag: tags.strikethrough, textDecoration: "line-through" }, // 打ち消し線（GFM拡張）
]);

// エディターのテーマ設定
export const editorTheme = EditorView.theme({
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

// エディターの基本設定
export const editorConfig = {
  tabSize: 4,
  scrollMargins: { top: 64, bottom: 16 },
  placeholder: "ここにテキストを入力してください",
} as const;
