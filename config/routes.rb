Travelapp::Application.routes.draw do
  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'

  resources :destinations
  resources :itineraries
  resources :users, :except => [:index, :destroy]
  root :to => 'welcome#index'
end
