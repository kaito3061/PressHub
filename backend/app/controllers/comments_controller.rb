# app/controllers/comments_controller.rb
class CommentsController < ApplicationController
  before_action :set_press_release

  def create
    @comment = @press_release.comments.new(comment_params)
    @comment.user = current_user
    if @comment.save
      render json: @comment, status: :created
    else
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
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
