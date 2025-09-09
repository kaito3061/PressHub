
class PressReleasesController < ApplicationController
  before_action :set_press_release, only: %i[show update destroy]

  def index
  @press_releases = PressRelease.all
  render json: @press_releases
  end

  def show
  render json: @press_release
  end

  def create
  @press_release = PressRelease.new(press_release_params)
  # 認証未実装の場合は仮ユーザーをセット
  @press_release.user = User.first
    if @press_release.save
      render json: @press_release, status: :created
    else
      render json: { errors: @press_release.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @press_release.update(press_release_params)
      render json: @press_release
    else
      render json: { errors: @press_release.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @press_release.destroy
    head :no_content
  end

  private

  def set_press_release
    @press_release = PressRelease.find(params[:id])
  end

  def press_release_params
  params.fetch(:press_release, {}).permit(:title, :content )
  end
end
