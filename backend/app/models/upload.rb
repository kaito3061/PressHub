class Upload < ApplicationRecord
  belongs_to :press_release
  has_one_attached :file  # Active Storage

  validates :file, presence: true
end
