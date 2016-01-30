Rails.application.routes.draw do
  resources :pictures, only: [:index, :show]
  post '/pictures/:id' => 'pictures#update'

  root 'pages#home'
end
