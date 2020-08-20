class CreateStocks < ActiveRecord::Migration[6.0]
  def change
    create_table :stocks do |t|
      t.references :portfolio, null: false, foreign_key: true
      t.string :symbol
      t.integer :purchased_price

      t.timestamps
    end
  end
end
