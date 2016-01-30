class PicturesController < ApplicationController
  def show
  	picture = Picture.where(name: params["id"]).first
  	@stats = {
  		total: picture.votes.count,
  		yes: picture.votes.where(vote: 1).count,
  		name: params["id"]
  	}
  	respond_to do |format|
  		format.json { render json: @stats }
  	end
  end

  def update
  	puts "This method is being run"
  	picture = Picture.where(name: params["id"]).first
  	picture.votes.create(vote: params["vote"])
  	# respond_to do |format|
  	# 	format.json { render json: 1 }
  	# end
  end

  def index
  end
end
