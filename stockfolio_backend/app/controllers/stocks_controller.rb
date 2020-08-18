class StocksController < ApplicationController
  def create
    user = session_user
    portfolio = user.portfolio

    symbol = params[:symbol].upcase
    quantity = params[:quantity].to_i

    portfolio.add(symbol: symbol, quantity: quantity)

    if portfolio.errors.full_messages.empty?
      render json: UserBlueprint.render(user)
    else
      errors_json(portfolio)
    end
  end

  private

  def errors_json(portfolio)
    render json: {
      errors: portfolio.errors.full_messages
    }
  end
end
