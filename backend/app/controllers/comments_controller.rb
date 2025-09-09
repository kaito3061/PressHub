class CommentsController < ApplicationController
  # コメントを作るときに、どのプレスリリースに紐づけるかを先に探しておく
  before_action :set_press_release

  def create
    # 選ばれたプレスリリースに、紐づいたコメントを新しく作る
    @comment = @press_release.comments.new(comment_params)

    # コメントを書いたユーザーをセット（ログインしている人を current_user で取ってくる想定）
    @comment.user = current_user

    # 保存に成功したらそのコメントを返す。失敗したらエラーを返す
    if @comment.save
      render json: @comment, status: :created
    else
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  # URLに含まれている press_release_id を使って、対象のプレスリリースを取得する
  def set_press_release
    @press_release = PressRelease.find(params[:press_release_id])
  end

  # リクエストから受け取るパラメータを制限（セキュリティ対策）
  def comment_params
    params.require(:comment).permit(:content)
  end

  # ※このコントローラでは使っていないけど、プレスリリースのパラメータ制限
  def press_release_params
    params.require(:press_release).permit(:title, :body)
  end
end
