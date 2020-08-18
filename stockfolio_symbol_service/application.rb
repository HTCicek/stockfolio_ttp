require "sinatra"
require 'net/ftp'
require 'json'

# File Update
ftp_nas = Net::FTP.new('ftp.nasdaqtrader.com')
puts "attempting to connect to ftp.nasdaqtrader.com ..."

if ftp_nas.login
  puts "...connection established"
  ftp_nas.chdir('SymbolDirectory')
  # Backup original data
  File.rename("./data/nasdaqlisted.txt", "./data/nasdaqlisted.bak")
  File.rename("./data/otherlisted.txt", "./data/otherlisted.bak")
  # Get new data
  ftp_nas.gettextfile('nasdaqlisted.txt', "./data/nasdaqlisted.txt")
  ftp_nas.gettextfile('otherlisted.txt', './data/otherlisted.txt')
  puts "updated ticker data"
else
  puts "...couldn't connect to nasdaq for updated ticker info"
  puts "using previous datastore"
end

# make sure connection is closed
ftp_nas.close unless ftp_nas.closed?

# File Read
nasdaq_listed = "./data/nasdaqlisted.txt"
other_listed = "./data/otherlisted.txt"

nasdaq_listed_loaded = File.read(nasdaq_listed)

other_listed_loaded = File.read(other_listed)

# Delimit on \n to receive str[]
nas_first_split = nasdaq_listed_loaded.split("\n")
other_first_split = other_listed_loaded.split("\n")

# Delimit on | to receive str[][]
nas_second_split = nas_first_split.map {|list_item| list_item.split("|")}
other_second_split = other_first_split.map {|list_item| list_item.split("|")}

# Data

=begin

Ticker data is represented as an array of hashes
with each hash containing the ticker symbol and name of the "stock"

[
  {
    name: "microsoft",
    symbol: "MSFT"
  }
]
=end

ticker_symbols = []

[nas_second_split, other_second_split].each do |stock_list|
  stock_list.each do |stock|
    symbol, name = stock[0], stock[1]
    
    ticker_symbols << {symbol: symbol, name: name}
  end
end

ticker_symbols.uniq!
ticker_symbols.sort_by! {|stock| stock[:symbol]}

puts "done loading data!"

# Server

get "/tickers/:search" do
  search = params[:search].downcase

  content_type :json

  # filter initial search
  # lazy select of ticker data for a max of 20 results
  result = ticker_symbols.lazy.select do |tick|
    # Array#include? is now faster than Array#index
    # tick[:symbol].downcase.index(search) != nil
    tick[:symbol].downcase.include?(search)
  end.first(20)

  # some searches work better than others when searching over a stringified hashmap:
  # e.g. "work" returns a dozen matches before Slack
  # implementing a "correct" fuzzy searching algorithm would be a nice stretch goal

  result.to_json
end

not_found do
  "The only route is '/tickers/:search'"
end

error do
  "Whoops, looks like there was an error - #{env['sinatra.error'].name}"
end