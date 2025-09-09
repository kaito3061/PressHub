/**
 * @property {number} id - PressRelease ID
 * @property {string} title - タイトル
 * @property {string} content - 内容
 * @property {string} created_at - 作成日時
 * @property {string} updated_at - 更新日時
 * @property {number} userId - ユーザーID
 */
export type PressReleaseType = {
  id: number;
  title?: string;
  content?: string;
  created_at: string;
  updated_at: string;
  userId?: number;
};
