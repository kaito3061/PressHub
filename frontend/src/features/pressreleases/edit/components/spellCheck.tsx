import React from "react";
import { LiaSpellCheckSolid } from "react-icons/lia";
import { spellCheck } from "@/features/openai/hooks/useSpellCheck";
import { useSpellCheckContext } from "../context/spellCheckContext";

const SpellCheck = ({ doc }: { doc: string }) => {
  const { state, dispatch } = useSpellCheckContext();
  const { latestResult, isLoading, error } = state;

  const handleSpellCheck = async () => {
    if (isLoading) return;

    try {
      console.log("校正開始 - テキスト:", doc.substring(0, 50) + "...");
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "CLEAR_RESULT" });

      const result = await spellCheck(doc);
      console.log("校正結果を受信:", result);
      dispatch({ type: "SET_RESULT", payload: { result, originalText: doc } });
      console.log("Contextに結果を設定完了");
    } catch (error) {
      console.error("校正エラー:", error);
      const errorMessage =
        error instanceof Error ? error.message : "校正処理中にエラーが発生しました";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        className="rounded-full border border-gray-300 text-gray-600 text-xl w-10 h-10 flex items-center justify-center hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="校正を行う"
        disabled={isLoading}
        onClick={handleSpellCheck}
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
        ) : (
          <LiaSpellCheckSolid />
        )}
      </button>
      {latestResult && latestResult.messages && latestResult.messages.length > 0 && (
        <div className="text-xs text-gray-500">{latestResult.messages.length}件の指摘</div>
      )}
      {error && <div className="text-xs text-red-500 max-w-xs text-center">{error}</div>}
    </div>
  );
};

export default SpellCheck;
