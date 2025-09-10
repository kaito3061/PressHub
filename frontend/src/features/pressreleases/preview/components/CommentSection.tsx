import fetchCommentsByPressReleaseId from "@/features/comments/services/fetchCommentsByPressReleaseId";
import CommentBoard from "./CommentBoard";

interface CommentSectionProps {
  pressreleaseId: number;
}

export default async function CommentSection({ pressreleaseId }: CommentSectionProps) {
  const comments = await fetchCommentsByPressReleaseId({ id: pressreleaseId });

  return <CommentBoard pressreleaseId={pressreleaseId} initialComments={comments} />;
}
