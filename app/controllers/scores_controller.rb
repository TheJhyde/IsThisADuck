class ScoresController < ApplicationController
	def index
		@scores = Score.all

		@most_duck = Picture.first
		@least_duck = Picture.first

		Picture.all.each do |pic|
			if pic.yes_percent > @most_duck.yes_percent
				@most_duck = pic
			end
			if pic.yes_percent < @least_duck.yes_percent
				@least_duck = pic
			end
		end
	end

	def create
		new_score = Score.create(score_params)
		if new_score.save
			Score.order(score: :desc).last.delete
			redirect_to '/high_scores'
		else
			redirect_to '/'
		end
	end

	def is_high
		lowest_score = Score.order(score: :desc).last
		if params[:id].to_i > lowest_score.score
			@response = 1
		else
			@response = 0
		end
		respond_to do |format|
  			format.json { render json: @response }
  		end
	end

	private
		def score_params
			params.require(:score).permit(:name, :score)
		end
end
