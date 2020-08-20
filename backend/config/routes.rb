Rails.application.routes.draw do

  # authentication routes
  get '/login', to: 'auth#verify'
  post '/login', to: 'auth#create'

  # user routes
  get '/users/portfolio', to: 'users#show'
  post '/users', to: 'users#create'

  # stock routes
  post '/stocks', to: 'stocks#create'

end
