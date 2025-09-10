import { baseUrl } from "@/features/pressreleases/shared/const/baseUrl";
import { CommentType } from "../types/CommentType";

interface fetchCommentsByPressReleaseIdProps {
  id: number;
}
export default async function fetchCommentsByPressReleaseId({
  id,
}: fetchCommentsByPressReleaseIdProps): Promise<CommentType[]> {
  try {
    const data = await fetch(`${baseUrl}/press_releases/${id}/comments`);
    const comments: CommentType[] = await data.json();
    return comments;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(`Comment Fetch Failed: ${error}`);
    }
    return [];
  }
}
