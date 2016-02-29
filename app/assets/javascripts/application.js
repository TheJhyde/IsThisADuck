//= require jquery
//= require jquery_ujs
//= require p5.js
//= require_tree .

//Since this was a fast project for a game jam, I just stuck all the javascript in the application page.
var img; //the image currently being shown
var image_name; //the name of the image currently being shown

var state; //the current state of the game
var lastChange;
var last_vote; //how they voted last time
var percentage; //The percentage who agree or disagree with your opinion
var lives = 5;
var rounds = 0;
var high_score = false;

function setup() {
  canvas = createCanvas(600, 600);
  canvas.parent("#canvas")
  image_name = "duck1";
  img = loadImage("/duck1.jpeg", function(new_img){
  	new_img.resize(400, (new_img.height * 400)/new_img.width);
  });
  state = 0;
  $('#form').hide();
}

function draw() {
    background(255);
    fill(0);
    textAlign(LEFT, BOTTOM);
    textSize(20);
    text("Rounds: " + rounds + " Lives: " + lives, 0, 600);
    //State 0, show a picture to be judged
    if(state == 0){
	  textSize(80);
	  textAlign(LEFT, TOP);
	  fill(0);
	  text("Is This a Duck?", 0, 0);
	  image(img, 0, 0, img.width, img.height, 50, 90, img.width, img.height);

	  fill(200, 0, 0);
	  rect(20, 480, 100, 50);
	  rect(480, 480, 100, 50);

	  textSize(40);
	  fill(0);
	  text("YES", 30, 490);
	  text("NO", 500, 490);
	//State 1, showing the outcome of your guess
	}else if(state == 1){
	  fill(0);
	  textSize(80);
	  textAlign(LEFT, TOP);
	  text("THANK YOU", 0, 200);

	  textSize(20);
	  if(percentage > 50){
	  	text(percentage + "% of people agree. Your opinion is too popular and you lose a life.", 0, 400);
	  }else{
	  	text(percentage + "% of people agree. Your opinion is unpopular.", 0, 400);
	  }

	  if(millis() - lastChange > 2000){
	  	state = 0;
	  }
	//State 2, you've died. See your score, are informed if you got a high one
	}else if(state == 2){
	  textSize(40);
	  textAlign(LEFT, TOP);
	  text("Your opinions are too popular.", 0, 100);
	  text("You died.", 0, 200);
	  textSize(20);
	  text("You made it " + rounds + " rounds in IS THIS A DUCK?", 0, 300);
	  if(high_score){
	  	text("You got a HIGH SCORE! Enter your name below.", 0, 400);
	  }else{
		text("Thank you.", 0, 400);
	  }
	}
}

function mouseClicked(){
	if(state == 0){
		//Takes their votes and moves the game to the next stage
		if(mouseY > 480 && mouseY < 530){
			if(mouseX > 20 && mouseX < 120){
				last_vote = 1;
				resetPage();
			}else if(mouseX > 480 && mouseX < 580){
				last_vote = 0;
				resetPage();
			}
		}
	}
}

function resetPage(){
	rounds++;
	//Pulls the informaton of the picture to score the player
	$.get('/pictures/' + image_name + ".json", function(data){
		if(last_vote == 1){
			percentage = Math.floor((data["yes"]/data["total"]) * 100);
		}else{
			percentage = Math.floor((1 - data["yes"]/data["total"]) * 100);
		}
		//Players score if the opinions are an equal 50/50 split. I am being kind.
		if(percentage > 50){
			lives--;
			if(lives == 0){
				state = 2;
				checkScore();
			}
		}
		$.post('/pictures/' + data["name"], {"vote": last_vote});
	});

	state = 1;
	lastChange = millis();

	//Randomly generates the next image to load
	whichImage = Math.floor(Math.random() * 61 + 1);
	image_name = "duck" + whichImage;
	img = loadImage("/" + image_name + ".jpeg", function(new_img){
	  	new_img.resize(400, 400);
	});
}

//Compares the current number to the list of high scores on the server and sees if it's a high score
//If it is, let them submit their name to the high score list
function checkScore(){
	$.get('/is_high/' + rounds + '.json', function(data){
		if(data == 1){
			high_score = true;
			$('#form').show();
			$('#score_score').attr('value', rounds);
		}
	});
}
