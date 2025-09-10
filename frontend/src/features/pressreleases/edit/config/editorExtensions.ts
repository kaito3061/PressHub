import { EditorState } from "@codemirror/state";
import { EditorView, placeholder } from "@codemirror/view";
import { Extension } from "@codemirror/state";
import { history } from "@codemirror/commands";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { syntaxHighlighting } from "@codemirror/language";
import { highlightStyle, editorTheme, editorConfig } from "../styles/editorStyles";

// エディターの拡張機能を構築する関数
export const createEditorExtensions = (
  updateListener: Extension,
  customKeymap: Extension
): Extension[] => {
  return [
    placeholder(editorConfig.placeholder),
    history(),
    updateListener,
    customKeymap,
    EditorView.scrollMargins.of(() => editorConfig.scrollMargins),
    EditorView.lineWrapping,
    EditorState.tabSize.of(editorConfig.tabSize),
    editorTheme,
    syntaxHighlighting(highlightStyle),
    markdown({
      base: markdownLanguage,
      completeHTMLTags: false,
    }),
  ];
};
