import React from "react";
import EditToggle from "./editToggle";
import Review from "./review";

type RightSidebarProps = {
  isEdit: boolean;
  onToggle: (isEdit: boolean) => void;
};

const RightSidebar = ({ isEdit, onToggle }: RightSidebarProps) => {
  return (
    <div className="flex flex-col w-50 p-4 border-l border-gray-300 sticky left-0 z-0 min-h-screen">
      <div className="flex flex-col items-center justify-center gap-4">
        {/* 編集モード切替 */}
        <EditToggle isEdit={isEdit} onToggle={onToggle} />

        {/* レビューボタン */}
        <Review />
      </div>
    </div>
  );
};

export default RightSidebar;
