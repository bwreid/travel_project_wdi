Travelapp::Application.routes.draw do
  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'

  resources :itineraries, :except => [:new, :edit]
  resources :users, :except => [:index, :destroy]
  root :to => 'welcome#index'
end
