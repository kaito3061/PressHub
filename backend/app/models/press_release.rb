class PressRelease < ApplicationRecord
  # プレスリリースはユーザーに紐づく（ただしゲスト投稿も許可するので必須ではない）
  belongs_to :user, optional: true

  # 関連するリビジョン（履歴）、アップロード（ファイル）、コメントを持つ
  # プレスリリースが削除されたら関連データも一緒に削除される
  has_many :revisions, dependent: :destroy
  has_many :uploads, dependent: :destroy
  has_many :comments, dependent: :destroy

  # validates :title, presence: true
  # validates :content, presence: true
end
