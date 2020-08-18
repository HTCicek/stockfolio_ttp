class Portfolio < ApplicationRecord
  belongs_to :user
  has_many :stocks

  def add(symbol:, quantity:)
    api = IexWrapper.new(test: true)
    resp = api.quote(symbol)
    if resp.body.length < 20
      errors.add(:symbol, "No such symbol")
    else
      parsed_resp = JSON.parse(resp.body)

      cost = parsed_resp["latestPrice"].to_i * 100 # converting to cents
      total_cost = cost * quantity

      if balance_check(total_cost)
        quantity.times do
          stock = Stock.create(symbol: symbol, purchased_price: cost, portfolio_id: id)
        end
        new_balance = user.balance - total_cost
        user.update(balance: new_balance)
        user.save
      else
        errors.add(:user, "insufficient funds")
      end
    end
  end

  def stocks_by_quantity
    stocks_by_symbol.frequency
  end

  def stocks_by_symbol
    stocks.map{|stock| stock.symbol}
  end

  def current_value
    api = IexWrapper.new
    resp = api.batch_quote(stocks_by_symbol.uniq)

    # We need to update all of the stocks here.
    parsed_resp = JSON.parse(resp.body)

    value = 0
    stocks.each do |stock|
      stock.quote = parsed_resp["#{stock.symbol}"]["quote"]
      value += stock.latest_price * 100 # gotta be in cents
    end
    value
  end

  private

  def balance_check(cost)
    user.balance >= cost
  end

end
