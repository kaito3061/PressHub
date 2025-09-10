import { keymap } from "@codemirror/view";

// エディターのキーマップ設定
export const createEditorKeymap = (savePreview: () => void) => {
  return keymap.of([
    {
      // 本文の保存
      key: "Mod-s",
      run() {
        savePreview();
        return true;
      },
      preventDefault: true,
    },
  ]);
};
