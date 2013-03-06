class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first
      t.string :last
      t.string :password_digest
      t.string :image
      t.string :email
      t.string :address
      t.float :lat
      t.float :long

      t.timestamps
    end
  end
end
