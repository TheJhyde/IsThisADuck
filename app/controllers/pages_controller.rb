class PagesController < ApplicationController
	def home
		@score = Score.new
	end
end
