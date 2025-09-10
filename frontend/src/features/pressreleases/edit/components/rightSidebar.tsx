import React from "react";
import EditToggle from "./editToggle";
import Review from "./review";
import SpellCheck from "./spellCheck";

type RightSidebarProps = {
  title: string;
  content: string;
  isEdit: boolean;
  onToggle: (isEdit: boolean) => void;
  navigateToLine?: (lineNumber: number) => void;
};

const RightSidebar = ({ title, content, isEdit, onToggle }: RightSidebarProps) => {
  return (
    <div className="flex flex-col w-50 p-4 border-l border-gray-300 sticky right-0 top-0 z-10 h-screen bg-white">
      <div className="flex flex-col items-center justify-center gap-4">
        {/* 編集モード切替 */}
        <EditToggle isEdit={isEdit} onToggle={onToggle} />

        {/* 校正ボタン */}
        <SpellCheck title={title} content={content} />

        {/* レビューボタン */}
        <Review />
      </div>
    </div>
  );
};

export default RightSidebar;
