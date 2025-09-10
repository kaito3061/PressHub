import { baseUrl } from "@/features/pressreleases/shared/const/baseUrl";
import { CommentType } from "../types/CommentType";

interface createCommentProps {
  pressreleaseId: number;
  content: string;
}
export default async function createComment({
  pressreleaseId,
  content,
}: createCommentProps): Promise<CommentType | undefined> {
  try {
    const response = await fetch(`${baseUrl}/press_releases/${pressreleaseId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        comment: {
          content,
        },
      }),
    });
    if (!response.ok) {
      throw new Error("コメント作成に失敗しました");
    }

    const comment = await response.json();

    return comment;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(`Failed Create Comment: ${error}`);
    }
  }
}
