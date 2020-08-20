class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password_digest

      # formatting as money -> 5,000.00
      # not using the rails-money gem because
      # the features are extraneous to this use case 
      t.integer :balance, :null => false, :default => 5_000_00

      t.timestamps
    end
    add_index :users, :email, unique: true
  end
end
