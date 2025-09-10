class UsersController < ApplicationController
  # 新しいユーザーを作成する
  def create
    user = User.new(user_params)  # 受け取ったパラメータからユーザーを作成

    if user.save
      # 保存に成功したらユーザー情報を返す
      render json: user, status: :created
    else
      # 保存に失敗したらエラーメッセージを返す
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  # 外部から受け取るデータを制限する（セキュリティ対策）
  # ここで指定した name, email 以外は受け取らない
  def user_params
    params.require(:user).permit(:name, :email)
  end
end
