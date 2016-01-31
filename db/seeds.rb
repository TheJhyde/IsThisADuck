# (1..61).each do |i|
# 	picture = Picture.create(name: "duck#{i}");
# 	picture.votes.create(vote: 0);
# 	picture.votes.create(vote: 1);
# end

10.times do
	Score.create(name: "Nobody", score: 0)
end