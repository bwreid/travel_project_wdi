class ItinerariesController < ApplicationController
  before_filter :is_logged_in

  # GET /itineraries
  # GET /itineraries.json
  def index
    @itineraries = @auth.itineraries.order( :start )

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @itineraries }
    end
  end

  # GET /itineraries/1
  # GET /itineraries/1.json
  def show
    @itinerary = Itinerary.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @itinerary }
    end
  end

  def create
    itinerary = Itinerary.new(params[:itinerary])

    respond_to do |format|
      if itinerary.save
        params[:destinations].each { |address| itinerary.destinations << Destination.create( :address => address ) }
        @auth.itineraries << itinerary
        format.json { render :json => [itinerary.as_json(:include => :destinations)] }
      else
        format.json { render json: itinerary.errors, status: :unprocessable_entity }
      end
    end

  end

  # PUT /itineraries/1
  # PUT /itineraries/1.json
  def update
    itinerary = Itinerary.find(params[:id])

    respond_to do |format|
      if itinerary.update_attributes(params[:itinerary])
        itinerary.destinations.delete_all
        params[:destinations].each { |address| itinerary.destinations << Destination.create( :address => address ) }
        format.json { render :json => [itinerary.as_json(:include => :destinations)] }
      else
        format.json { render json: itinerary.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /itineraries/1
  # DELETE /itineraries/1.json
  def destroy
    itinerary = Itinerary.find(params[:id])
    itinerary.destinations.each do |x|
      x.delete
    end
    itinerary.destroy
    render :nothing => true
  end
end