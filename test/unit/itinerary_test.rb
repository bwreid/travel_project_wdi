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

require 'test_helper'

class ItineraryTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
