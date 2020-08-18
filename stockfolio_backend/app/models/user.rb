class User < ApplicationRecord

  # BCrypt macro for passwords
  has_secure_password

  # backend validation for unique email
  validates :email, uniqueness: true

  ## Got caught up doing work on a different feature
  # def purchase(stock_code:, qty: 1)

  # end
  
  # private

  # def enough_funds?(value)
  #   !!balance >= value
  # end
  
  # def purchase_stock(stock_code:)
  #   # check to see if valid stock code
  #   # check to see if have enough balance
  # end

  # def update_balance(num)
  #   update(balance: balance - num)
  #   save
  # end
end
