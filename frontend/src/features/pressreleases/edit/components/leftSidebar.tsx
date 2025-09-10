import React from "react";

type LeftSidebarProps = {
  content: string;
  onJump: (line: number) => void;
};

const LeftSidebar = ({ content, onJump }: LeftSidebarProps) => {
  const wordCount = content.split(/\s+/).length - 1;
  const imageCount = content.match(/!\[.*?\]\(.*?\)/g)?.length || 0;
  const handleHeadingClick = (line: number) => {
    onJump?.(line);
  };
  return (
    <div className="flex flex-col w-70 p-4 border-r border-gray-300 sticky left-0 z-0 min-h-screen">
      <p className="text-xl font-bold">目次</p>
      <div className="flex flex-col gap-2 mt-3 ml-4">
        {content.split("\n").map((line, idx) => {
          if (!line.startsWith("## ")) return null;
          const label = line.replace("## ", "");
          return (
            <button
              key={idx}
              type="button"
              className="text-left text-gray-700 hover:text-gray-900 hover:underline cursor-pointer"
              onClick={() => handleHeadingClick(idx + 1)}
            >
              • {label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-1 mt-8 p-3 text-right text-base text-gray-600">
        <div className="flex gap-1 justify-between">
          <p>文字数:</p>
          <p>{wordCount} / 8000</p>
        </div>
        <div className="flex gap-1 justify-between">
          <p>画像:</p>
          <p>{imageCount} / 20</p>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
