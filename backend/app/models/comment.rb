class Comment < ApplicationRecord
  belongs_to :press_release
  belongs_to :user, optional: true  # ゲストコメントも許可

  validates :content, presence: true
end
