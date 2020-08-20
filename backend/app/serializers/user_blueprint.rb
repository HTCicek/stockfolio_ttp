class UserBlueprint < Blueprinter::Base
  identifier :id

  fields :name, :email, :balance
  association :portfolio, blueprint: PortfolioBlueprint
end