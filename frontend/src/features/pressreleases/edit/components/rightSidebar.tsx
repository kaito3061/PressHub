import React from "react";
import EditToggle from "./editToggle";
import Review from "./review";
import SpellCheck from "./spellCheck";

type RightSidebarProps = {
  doc: string;
  isEdit: boolean;
  onToggle: (isEdit: boolean) => void;
  navigateToLine?: (lineNumber: number) => void;
};

const RightSidebar = ({ doc, isEdit, onToggle }: RightSidebarProps) => {
  return (
    <div className="flex flex-col w-50 p-4 border-l border-gray-300 sticky left-0 z-0 min-h-screen">
      <div className="flex flex-col items-center justify-center gap-4">
        {/* 編集モード切替 */}
        <EditToggle isEdit={isEdit} onToggle={onToggle} />

        {/* 校正ボタン */}
        <SpellCheck doc={doc} />

        {/* レビューボタン */}
        <Review />
      </div>
    </div>
  );
};

export default RightSidebar;
