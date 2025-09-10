require "test_helper"

class PressReleasesControllerTest < ActionDispatch::IntegrationTest
  test "プレスリリース作成できる" do
    assert_difference("PressRelease.count", 1) do
      post press_releases_url,
           params: { press_release: { title: "sample", content: "content" } },
           as: :json
    end

    assert_response :success
  end
end
