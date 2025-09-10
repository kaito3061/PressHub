import { CommentType } from "@/features/comments/types/CommentType";
import { Card, CardContent } from "@/features/shadcn/components/ui/card";

interface CommentListProps {
  comments: CommentType[];
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className="space-y-4">
      {comments.length === 0 ? (
        <p className="text-gray-500">まだコメントはありません。</p>
      ) : (
        comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500 mb-2">投稿日: {comment.created_at}</p>
              <p className="text-base">{comment.content}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
