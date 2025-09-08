class CommentsController < ApplicationController
  before_action :set_press_release

  def create
    @comment = @press_release.comments.new(comment_params)
    @comment.user = current_user  # ゲストの場合は nil のままでもOK
    if @comment.save
      redirect_to @press_release, notice: "Comment added."
    else
      redirect_to @press_release, alert: "Failed to add comment."
    end
  end

  private

  def set_press_release
    @press_release = PressRelease.find(params[:press_release_id])
  end

  def comment_params
    params.require(:comment).permit(:content)
  end
end
