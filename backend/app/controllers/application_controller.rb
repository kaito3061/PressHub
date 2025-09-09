# frozen_string_literal: true

class ApplicationController < ActionController::API
  # API モードではビュー関連の機能は不要なので ActionController::API を継承
  # JSON レスポンスや before_action など API 用の機能のみ使用
end
