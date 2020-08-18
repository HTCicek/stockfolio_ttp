# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user_1 = User.create(email: "htcicek@email.com", name: 'Turcan C', password: '1234', password_confirmation: '1234')
user_1.portfolio = Portfolio.create
user_1.portfolio.stocks = [
  Stock.create(symbol: "FB", purchased_price: 11500 ),
  Stock.create(symbol: "FB", purchased_price: 12000 ),
  Stock.create(symbol: "FB", purchased_price: 13500 ),
  Stock.create(symbol: "MSFT", purchased_price: 31500 ),
  Stock.create(symbol: "MSFT", purchased_price: 26500 ),
  Stock.create(symbol: "MSFT", purchased_price: 28500 ),
]
user_1.save
