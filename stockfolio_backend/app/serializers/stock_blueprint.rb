class StockBlueprint < Blueprinter::Base
  identifier :id

  fields :symbol, :purchased_price, :latest_price, :company_name, :compare_price
end