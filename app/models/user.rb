# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  first           :string(255)
#  last            :string(255)
#  password_digest :string(255)
#  image           :string(255)
#  email           :string(255)
#  address         :string(255)
#  lat             :float
#  long            :float
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  attr_accessible :address, :email, :first, :image, :last, :lat, :long, :password, :password_confirmation
  has_secure_password
  has_many :itineraries

  before_save :geolocate

  def home_coordinates
    [self.latitude, self.longitude]
  end

  private
  def geolocate
    result = Geocoder.search(self.address).first

    if result.present?
      self.lat = result.latitude
      self.long = result.longitude
    end
  end
end
