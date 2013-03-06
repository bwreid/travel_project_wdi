# == Schema Information
#
# Table name: itineraries
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  start      :date
#  end        :date
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Itinerary < ActiveRecord::Base
  attr_accessible :end, :name, :start, :user_id
  has_many :destinations
  belongs_to :user
end
