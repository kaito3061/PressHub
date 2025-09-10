"use client";

import createComment from "@/features/comments/services/createComment";
import { CommentType } from "@/features/comments/types/CommentType";
import { Button } from "@/features/shadcn/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shadcn/components/ui/card";
import { Textarea } from "@/features/shadcn/components/ui/textarea";
import { Dispatch, SetStateAction, useState } from "react";

interface CreateCommentCardProps {
  pressreleaseId: number;
  setComments: Dispatch<SetStateAction<CommentType[]>>;
}

export default function CreateCommentCard({ pressreleaseId, setComments }: CreateCommentCardProps) {
  const [newComment, setNewComment] = useState<string>("");

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    const comment = await createComment({ pressreleaseId, content: newComment });

    if (comment !== undefined) {
      setComments((prev) => [...prev, comment]);
      setNewComment("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>コメントを追加する</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="コメントを入力してください..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button onClick={handleSubmit} className="w-full">
          投稿する
        </Button>
      </CardContent>
    </Card>
  );
}
