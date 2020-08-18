Rails.application.routes.draw do

  resources :users, only: %i[create show]

  # authentication routes
  get '/login', to: 'auth#verify'
  post '/login', to: 'auth#create'
end
