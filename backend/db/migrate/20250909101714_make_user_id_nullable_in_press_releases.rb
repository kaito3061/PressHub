class MakeUserIdNullableInPressReleases < ActiveRecord::Migration[8.0]
  def change
     change_column_null :press_releases, :user_id, true
  end
end
