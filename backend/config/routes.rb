
Rails.application.routes.draw do
  root "press_releases#index" 

  resources :press_releases do
    # resources :revisions, only: [:index, :create]
    # resources :uploads, only: [:create]
    resources :comments, only: [:create]
    # resources :ai_reviews, only: [:create]
    resources :review_scores, only: [:create]
  end

  # ユーザー管理がある場合（Deviseなど）:
  # devise_for :users
end
