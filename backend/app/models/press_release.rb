class PressRelease < ApplicationRecord
  belongs_to :user
  has_many :revisions, dependent: :destroy
  has_many :uploads, dependent: :destroy
  has_many :comments, dependent: :destroy

  validates :title, presence: true
  validates :content, presence: true
end
