class RemoveBodyFromPressReleases < ActiveRecord::Migration[8.0]
  def change
    remove_column :press_releases, :body, :text
  end
end
