
# config/routes.rb
Rails.application.routes.draw do
  root to: 'press_releases#index'

  resources :press_releases do
    resources :uploads, only: [:create]
    resources :comments, only: [:create]
    resources :revisions, only: [:index, :create]
  end
end
