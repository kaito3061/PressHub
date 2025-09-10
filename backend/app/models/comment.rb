class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :press_release
end
