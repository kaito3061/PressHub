class User < ApplicationRecord
    # PressRelease と Comment と 1対多の関係
  has_many :press_releases, dependent: :destroy
  has_many :comments, dependent: :destroy

  # バリデーション将来的に必要なので書いてます。
  #validates :name, presence: true
  #validates :email, presence: true, uniqueness: true
end
