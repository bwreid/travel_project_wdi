# == Schema Information
#
# Table name: destinations
#
#  id           :integer          not null, primary key
#  itinerary_id :integer
#  address      :string(255)
#  lat          :float
#  long         :float
#  start        :date
#  end          :date
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Destination < ActiveRecord::Base
  attr_accessible :address, :end, :itinerary_id, :lat, :long, :start
  belongs_to :itinerary

  before_save :geolocate

  private
  def geolocate
    result = Geocoder.search(self.address).first

    if result.present?
      self.lat = result.latitude
      self.long = result.longitude
    end
  end
end
