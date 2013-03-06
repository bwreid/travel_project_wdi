class CreateDestinations < ActiveRecord::Migration
  def change
    create_table :destinations do |t|
      t.integer :itinerary_id
      t.string :address
      t.float :lat
      t.float :long
      t.date :start
      t.date :end

      t.timestamps
    end
  end
end
