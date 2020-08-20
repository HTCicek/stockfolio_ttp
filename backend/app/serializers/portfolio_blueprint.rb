class PortfolioBlueprint < Blueprinter::Base
  identifier :id
  field :current_value
  
  association :stocks, blueprint: StockBlueprint
end