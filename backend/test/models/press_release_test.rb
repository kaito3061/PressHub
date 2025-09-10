require "test_helper"

class PressReleaseTest < ActiveSupport::TestCase
  test "作成できること（バリデーションなし）" do
    press_release = PressRelease.new(title: "test", content: "content")
    assert press_release.save
  end
end
