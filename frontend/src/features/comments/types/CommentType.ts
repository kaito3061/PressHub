/**
 * @property {pressreleaseId} 紐づいてるPressReleaseのid
 * @property {userId} 投稿者
 * @property {content} 投稿内容
 * @property {created_at} 投稿日
 * @property {updated_at} 最終変更日
 */
export type CommentType = {
  id: number;
  pressreleaseId: number;
  userId?: number;
  content: string;
  created_at: string;
  updated_at: string;
};
