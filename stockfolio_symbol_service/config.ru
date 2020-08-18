require 'sinatra'

set :run, false
set :environment, ENV['RACK_ENV'] || 'development'
configure { set :server, :puma }

require './application'
run Sinatra::Application