class AddBodyToPressReleases < ActiveRecord::Migration[8.0]
  def change
    add_column :press_releases, :body, :text
  end
end
