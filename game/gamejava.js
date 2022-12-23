var character = document.getElementById("character");
var enemy = document.getElementById("enemy");
var lightsaber = document.getElementById("lightsaber");
var x_position = 0;
var score = 0;
var e_score = 0;
var health = document.getElementById("health");
var e_health = document.getElementById("e_health");
var game_over = false;

function jump(event){
	var x = event.key;
	if (x == 'w'){
		if(character.classList.contains("jump_animate")){return}
		if(lightsaber.classList.contains("swing_animate")){return}
		character.classList.add("jump_animate");
		lightsaber.classList.add("jump_animate");
		setTimeout(function(){
			character.classList.remove("jump_animate");
			lightsaber.classList.remove("jump_animate");
		},300);
	}
}

function move_sideways(event){
	var x = event.key;
	if (x == 'd'){
		x_position += 5;
		if (x_position > 820){
			x_position = 820;
		}
		character.style.left = x_position + 'px';
		lightsaber.style.left = x_position + 60 + 'px';

	}
	else if (x == 'a'){
		x_position -= 5;
		if (x_position < 0){
			x_position = 0;
		}
		character.style.left = x_position + 'px';
		lightsaber.style.left = x_position + 60 + 'px';
	}
}

function swing(event){
	var x = event.key;
	if (x == 's'){
		//swing lightsaber
		if(lightsaber.classList.contains("swing_animate")){return}
		if(character.classList.contains("jump_animate")){return}
		lightsaber.classList.add("swing_animate");
		//check if lightsaber made contact
		let lightsaber_left = parseInt(window.getComputedStyle(lightsaber).getPropertyValue("left"));
		let enemy_left = parseInt(window.getComputedStyle(enemy).getPropertyValue("left"));
		if (lightsaber_left <= (enemy_left+80) && (lightsaber_left+120) >= enemy_left && !game_over){			
			score++;
			//player_score.innerHTML = "Score: " + score;	
			e_health.value = 100 - score*10;
		}
		setTimeout(function(){
			lightsaber.classList.remove("swing_animate");
		},300);
		if (e_health.value <= 0 && !game_over){
			alert("You win!");
			game_over = true;
		}
		
	}
}
//setinterval calls the function every 10 milliseconds 
var checkDead = setInterval(function() {
    let character_left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    let e_lightsaber = parseInt(window.getComputedStyle(enemy_lightsaber).getPropertyValue("left"));
	let character_top = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
	//enemy only swings when lightsaber left is at 400 px 
    if(e_lightsaber == 400 && character_left>=340 && character_left<=520 && !game_over){
		e_score++;
		//enemy_score.innerHTML = "Enemy Score: " + e_score;
    }
	health.value = 100 - e_score;
	if (health.value <= 0 && !game_over){
		alert("You lose.");
		game_over = true;
	}
}, 50);

