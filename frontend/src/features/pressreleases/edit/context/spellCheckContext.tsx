"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { SpellCheckResultType } from "@/features/openai/types/spellCheckResult";

// 状態の型定義
interface SpellCheckState {
  latestResult: SpellCheckResultType | null;
  originalText: string | null;
  isLoading: boolean;
  error: string | null;
}

// アクションの型定義
type SpellCheckAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_RESULT"; payload: { result: SpellCheckResultType; originalText: string } }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "CLEAR_RESULT" };

// 初期状態
const initialState: SpellCheckState = {
  latestResult: null,
  originalText: null,
  isLoading: false,
  error: null,
};

const spellCheckReducer = (state: SpellCheckState, action: SpellCheckAction): SpellCheckState => {
  console.log("Reducer - アクション:", action.type, "payload" in action ? action.payload : "なし");

  switch (action.type) {
    case "SET_LOADING":
      const newLoadingState = { ...state, isLoading: action.payload };
      console.log("Reducer - 新しい状態 (LOADING):", newLoadingState);
      return newLoadingState;
    case "SET_RESULT":
      const newResultState = {
        ...state,
        latestResult: action.payload.result,
        originalText: action.payload.originalText,
        error: null,
      };
      console.log("Reducer - 新しい状態 (RESULT):", newResultState);
      return newResultState;
    case "SET_ERROR":
      const newErrorState = { ...state, error: action.payload, latestResult: null };
      console.log("Reducer - 新しい状態 (ERROR):", newErrorState);
      return newErrorState;
    case "CLEAR_RESULT":
      const newClearState = { ...state, latestResult: null, originalText: null, error: null };
      console.log("Reducer - 新しい状態 (CLEAR):", newClearState);
      return newClearState;
    default:
      return state;
  }
};

const SpellCheckContext = createContext<{
  state: SpellCheckState;
  dispatch: React.Dispatch<SpellCheckAction>;
} | null>(null);

export const SpellCheckProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(spellCheckReducer, initialState);

  return (
    <SpellCheckContext.Provider value={{ state, dispatch }}>{children}</SpellCheckContext.Provider>
  );
};

export const useSpellCheckContext = () => {
  const context = useContext(SpellCheckContext);
  if (!context) {
    throw new Error("useSpellCheckContext must be used within a SpellCheckProvider");
  }
  return context;
};
