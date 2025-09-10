"use client";

import { CommentType } from "@/features/comments/types/CommentType";
import { useState } from "react";
import CommentList from "./CommentList";
import CreateCommentCard from "./CreateCommentCard";

interface CommentBoardProps {
  pressreleaseId: number;
  initialComments: CommentType[];
}

export default function CommentBoard({ pressreleaseId, initialComments }: CommentBoardProps) {
  const [comments, setComments] = useState<CommentType[]>(initialComments);

  return (
    <div className="space-y-6 mt-8">
      <CreateCommentCard pressreleaseId={pressreleaseId} setComments={setComments} />
      <CommentList comments={comments} />
    </div>
  );
}
