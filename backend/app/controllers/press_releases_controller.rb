class PressReleasesController < ApplicationController
  # show / update / destroy のときは対象のプレスリリースを先に探しておく
  before_action :set_press_release, only: %i[show update destroy]

  # 全てのプレスリリースを一覧で返す
  def index
    @press_releases = PressRelease.all
    render json: @press_releases
  end

  # 1件のプレスリリースを返す
  def show
    render json: @press_release
  end

  # 新しいプレスリリースを作成する
  def create
    @press_release = PressRelease.new(press_release_params)

    # 認証がまだ未実装なので、仮に最初のユーザーを紐づけている
    @press_release.user = User.first

    if @press_release.save
      # 保存に成功したら作成したプレスリリースを返す
      render json: @press_release, status: :created
    else
      # 失敗したらエラーメッセージを返す
      render json: { errors: @press_release.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # 既存のプレスリリースを更新する
  def update
    if @press_release.update(press_release_params)
      render json: @press_release
    else
      render json: { errors: @press_release.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # プレスリリースを削除する
  def destroy
    @press_release.destroy
    head :no_content
  end

  private

  # IDでプレスリリースを探す（存在しない場合は例外）
  def set_press_release
    @press_release = PressRelease.find(params[:id])
  end

  # リクエストで受け取るデータを制限（セキュリティ対策）
  def press_release_params
  params.fetch(:press_release, {}).permit(:title, :content )
  end
end
