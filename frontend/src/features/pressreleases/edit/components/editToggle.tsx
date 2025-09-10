import React from "react";
import { LuPencil } from "react-icons/lu";
import { IoPlayOutline } from "react-icons/io5";

const EditToggle = ({
  isEdit,
  onToggle,
}: {
  isEdit: boolean;
  onToggle: (isEdit: boolean) => void;
}) => {
  return (
    <div className="relative flex items-center bg-gray-100 rounded-full p-1 gap-1 select-none">
      {/* 移動するボタン */}
      <span
        aria-hidden
        className={`absolute top-1 left-1 w-9 h-9 rounded-full bg-black transition-transform duration-200 ease-out ${
          isEdit ? "translate-x-0" : "translate-x-[calc(100%+0.25rem)]"
        }`}
      />

      {/* 編集ボタン */}
      <button
        type="button"
        onClick={() => onToggle(true)}
        className={`w-9 h-9 rounded-full flex items-center justify-center relative z-10 transition-colors duration-150 cursor-pointer ${
          isEdit ? "text-white" : "text-gray-600 hover:text-gray-700"
        }`}
        aria-pressed={isEdit}
      >
        <LuPencil size={15} />
      </button>

      {/* プレビューボタン */}
      <button
        type="button"
        onClick={() => onToggle(false)}
        className={`w-9 h-9 rounded-full flex items-center justify-center relative z-10 transition-colors duration-150 cursor-pointer ${
          !isEdit ? "text-white" : "text-gray-600 hover:text-gray-700"
        }`}
        aria-pressed={!isEdit}
      >
        <IoPlayOutline size={15} />
      </button>
    </div>
  );
};

export default EditToggle;
