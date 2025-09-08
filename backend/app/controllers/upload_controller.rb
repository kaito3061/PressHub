class UploadsController < ApplicationController
  # 特定のプレスリリースに紐付けるため、各アクション実行前に @press_release を取得
  before_action :set_press_release

  # ファイルアップロード処理
  def create
    # @press_release に紐付いた uploads テーブルに新しいアップロードオブジェクトを作成
    @upload = @press_release.uploads.new(upload_params)
    
    # 保存できればプレスリリース詳細ページにリダイレクト
    # 失敗した場合は同じページに戻し、アラートを表示
    if @upload.save
      redirect_to @press_release, notice: "File uploaded."
    else
      redirect_to @press_release, alert: "Upload failed."
    end
  end

  private

  # URLパラメータから press_release_id を取得し、@press_release にセット
  # このメソッドで関連付けを簡単に扱えるようにしている
  def set_press_release
    @press_release = PressRelease.find(params[:press_release_id])
  end

  # Strong Parameters
  # フォームから送信されるファイルパラメータのみ許可
  # セキュリティ上、これ以外の値は無視される
  def upload_params
    params.require(:upload).permit(:file)
  end
end
