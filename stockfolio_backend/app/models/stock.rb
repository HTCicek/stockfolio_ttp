class Stock < ApplicationRecord
  belongs_to :portfolio

  attr_reader :compare_price, :company_name, :latest_price, :quote

  def quote
    # memoizing the response to save on calls
    @quote ||= JSON.parse(IexWrapper.new.quote(symbol).body)
  end

  def quote=(some_hash)
    # sets quotes from portfolio when initially called
    @quote ||= some_hash
  end

  # too many random floating points for my liking
  def latest_price
    @latest_price = (quote["latestPrice"] * 100).to_i
  end
  
  def compare_price
    if quote["open"]
      @compare_price = (quote["open"] * 100).to_i
    else
      @compare_price = (quote["previousClose"] * 100).to_i
    end
  end

  def company_name
    @company_name ||= quote["companyName"]
  end
end
