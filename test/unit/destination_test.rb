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

require 'test_helper'

class DestinationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
