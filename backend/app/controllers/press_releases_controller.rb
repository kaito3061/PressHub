# frozen_string_literal: true

class PressReleasesController < ApplicationController
  # show, edit, update, destroy アクションの前に対象のプレスリリースを取得
  before_action :set_press_release, only: %i[show edit update destroy]

  # プレスリリースの一覧表示
  def index
    @press_releases = PressRelease.all
  end

  # 個別のプレスリリース詳細表示
  # show.html.erb で @press_release を参照
  def show; end

  # 新しいプレスリリース作成フォーム用
  def new
    @press_release = PressRelease.new
  end

  # 新規プレスリリース作成
  def create
    # フォームから送られてきたパラメータで新規作成
    @press_release = PressRelease.new(press_release_params)
    # 作成者を current_user に紐付け
    @press_release.user = current_user

    # 保存成功で詳細ページにリダイレクト
    if @press_release.save
      redirect_to @press_release, notice: 'Press release created.'
    else
      # 保存失敗時はフォームを再表示してエラーを確認可能に
      render :new
    end
  end

  # 既存プレスリリース編集フォーム
  def edit; end

  # 既存プレスリリースの更新処理
  def update
    if @press_release.update(press_release_params)
      # 更新成功時は詳細ページにリダイレクト
      redirect_to @press_release, notice: 'Press release updated.'
    else
      # 更新失敗時は編集フォームに戻す
      render :edit
    end
  end

  # プレスリリース削除
  def destroy
    @press_release.destroy
    # 削除後は一覧ページにリダイレクト
    redirect_to press_releases_path, notice: 'Press release deleted.'
  end

  private

  # params[:id] から該当プレスリリースを取得
  # before_action で繰り返しコードを書かずに済む
  def set_press_release
    @press_release = PressRelease.find(params[:id])
  end

  # strong parameters: 許可されたパラメータのみ受け取る
  # title と content のみを許可
  def press_release_params
    params.require(:press_release).permit(:title, :content)
  end
end
