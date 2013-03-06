# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.delete_all
Itinerary.delete_all
Destination.delete_all

user = User.create( :email => 'x', :password => 'x', :password_confirmation => 'x', :first => 'Bryan', :last => 'Reid', :image => 'bryan.jpg', :address => '452 Dean Street, Brooklyn, NY 11217' )

itin1 = Itinerary.create( :name => 'Pacific Northwest Trip', :start => '2013-05-21', :end => '2013-06-24' )
d1 = Destination.create( :address => '603 Pisces Lane, Foster City, CA 94404', :start => '2013-05-21', :end => '2013-06-01' )
d2 = Destination.create( :address => 'San Francisco, CA', :start => '2013-06-01', :end => '2013-06-06' )
d3 = Destination.create( :address => 'Portland, OR', :start => '2013-06-06', :end => '2013-06-11' )
d4 = Destination.create( :address => 'Seattle, WA', :start => '2013-06-11', :end => '2013-06-24' )

itin1.destinations = [d1, d2, d3, d4]

user.itineraries << itin1