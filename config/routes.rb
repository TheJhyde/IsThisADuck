Rails.application.routes.draw do
  resources :pictures, only: [:index, :show]
  post '/pictures/:id' => 'pictures#update'

  root 'pages#home'

  get '/high_scores' => 'scores#index'
  get '/is_high/:id' => 'scores#is_high'
  post '/scores' => 'scores#create'
end
