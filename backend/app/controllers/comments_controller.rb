class CommentsController < ApplicationController
  # このコントローラーはプレスリリースに対するコメントの作成を担当
  # コメント作成の前に対象のPressReleaseを取得する
  before_action :set_press_release

  # コメントを作成するアクション
  def create
    # 関連付けられたコメントを新規作成
    # current_user が存在すればユーザーを紐付け、ゲストなら nil のまま
    @comment = @press_release.comments.new(comment_params)
    @comment.user = current_user  

    # 保存に成功したらプレスリリース詳細ページにリダイレクト
    if @comment.save
      redirect_to @press_release, notice: "Comment added."
    else
      # 保存に失敗した場合も同じページにリダイレクトし、エラーを通知
      redirect_to @press_release, alert: "Failed to add comment."
    end
  end

  private

  # params から press_release_id を取得して該当する PressRelease をセット
  # before_action で毎回呼ばれるため、アクション側のコードがシンプルになる
  def set_press_release
    @press_release = PressRelease.find(params[:press_release_id])
  end

  # strong parameters を利用して、許可されたパラメータのみ受け取る
  # ここではコメント本文(content)だけを許可
  def comment_params
    params.require(:comment).permit(:content)
  end
end
