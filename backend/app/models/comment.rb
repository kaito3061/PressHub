class Comment < ApplicationRecord
  # コメントは必ず1つのプレスリリースに所属する
  belongs_to :press_release

  # コメントはユーザーに紐づくが、ゲスト投稿も許可する
  belongs_to :user, optional: true  

  # コメント本文は空ではいけない
  validates :content, presence: true
end
