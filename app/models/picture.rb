class Picture < ActiveRecord::Base
	has_many :votes

	def yes_percent
		(votes.where(vote: 1).count).to_f/(votes.count)
	end
end
