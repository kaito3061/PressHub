# app/controllers/uploads_controller.rb
class UploadsController < ApplicationController
  before_action :set_press_release

  def create
    @upload = @press_release.uploads.new(upload_params)
    if @upload.save
      render json: @upload, status: :created
    else
      render json: { errors: @upload.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_press_release
    @press_release = PressRelease.find(params[:press_release_id])
  end

  def upload_params
    params.require(:upload).permit(:file)
  end
end
