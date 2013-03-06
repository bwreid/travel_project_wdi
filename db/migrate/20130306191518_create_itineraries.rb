class CreateItineraries < ActiveRecord::Migration
  def change
    create_table :itineraries do |t|
      t.string :name
      t.date :start
      t.date :end
      t.integer :user_id

      t.timestamps
    end
  end
end
