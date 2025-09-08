class CreatePressReleases < ActiveRecord::Migration[8.0]
  def change
    create_table :press_releases do |t|
      t.string :title
      t.text :content

      t.timestamps
    end
  end
end
