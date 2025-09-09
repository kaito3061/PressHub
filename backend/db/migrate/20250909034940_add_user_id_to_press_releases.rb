class AddUserIdToPressReleases < ActiveRecord::Migration[8.0]
  def change
    add_reference :press_releases, :user, null: false, foreign_key: true
  end
end
