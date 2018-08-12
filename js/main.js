let memory_array = ['images/burundi.jpeg','images/burundi.jpeg','images/djibouti.jpeg',
'images/djibouti.jpeg','images/eritrea.jpeg','images/eritrea.jpeg','images/ethiopia.jpeg',
'images/ethiopia.jpeg','images/kenya.jpg','images/kenya.jpg','images/rwanda.jpeg',
'images/rwanda.jpeg','images/tanzania.jpeg','images/tanzania.jpeg','images/uganda.jpg',
'images/uganda.jpg'];
let memory_values = [];
let memory_tile_ids = [];
let tiles_flipped = 0;
let moveCount = 0;
let clicked = false;
let sec = 0;
let minute = 0;
let stars=5;

//Starts timer
function startClock() {
	if (clicked === false) {
		clock = setInterval("stopWatch()", 1000);
		clicked = true;
	}
}

//stops timer
function stopWatch() {
    sec++;
    if (sec===60){
    	minute++;
    	sec=0;
    }
    document.getElementById("timer").innerHTML = minute+"."+sec;
}

//restarts timer
function stopClock() {
    sec = 0;
    minute=0;
    document.getElementById("timer").innerHTML= minute+"."+sec;
    clicked = false;
}

//Star rating dependancies
function rating(){
	if (moveCount > 32 && moveCount <= 48 && sec > 30){
		document.getElementById('star5').style.visibility = "hidden";
		stars=4;
	}
	else if (moveCount > 48 && moveCount <= 64){
		document.getElementById('star4').style.visibility = "hidden";
		stars=3;
	}
	else if (moveCount > 64 && moveCount <= 80){
		document.getElementById('star3').style.visibility = "hidden";
		stars=2;
	}
	else if (moveCount > 80){
		document.getElementById('star2').style.visibility = "hidden";
		stars=1;
	}
}

// Shuffle function dynamically shuffling the board
Array.prototype.memory_tile_shuffle = function(){
    let i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

//creates a new game board and restarts every variable
function newBoard(){
	tiles_flipped = 0;
	let output = '';
    memory_array.memory_tile_shuffle();
	for(let i = 0; i < memory_array.length; i++){
		output += '<div class="flipper" id="tile_'+i+'" onclick="memoryFlipTile(this,\'<img src='+memory_array[i]+'>\')"></div>';
	}
	document.getElementById('memory_board').innerHTML = output;
	moveCount=0;
	document.getElementById('moves').innerHTML=moveCount;
	stopClock();
	document.getElementById('star2').style.visibility = "visible";
	document.getElementById('star3').style.visibility = "visible";
	document.getElementById('star4').style.visibility = "visible";
	document.getElementById('star5').style.visibility = "visible";
	stars=5;

}

//called when card is flipped
function memoryFlipTile(tile,val){
	moveCount++;
	startClock();
	rating();
	
	if(tile.innerHTML === "" && memory_values.length < 2){
		tile.innerHTML = val;
		if(memory_values.length === 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
		} else if(memory_values.length === 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			//Compares the flipped tiles
			if(memory_values[0] === memory_values[1]){
				tiles_flipped += 2;
				let tile_1 = document.getElementById(memory_tile_ids[0]);
				let tile_2 = document.getElementById(memory_tile_ids[1]);
				tile_1.classList.add("fade");
				tile_2.classList.add("fade");
				// Clears the array for a fresh pair of flips
				memory_values = [];
            	memory_tile_ids = [];
				// Check to see if the whole board is cleared
				if(tiles_flipped === memory_array.length){
					$('#winningInfo').text(`You are on fire!In ${sec} seconds, you did a total of ${moveCount} moves. You have ${stars} stars.Bravo!`);
					$('#modalWindow').modal('toggle');
					document.getElementById('memory_board').innerHTML = "";
					newBoard();
				}
			} else {
				function flip2Back(){
				    // Flip the 2 tiles back over when they do not match
				    let tile_1 = document.getElementById(memory_tile_ids[0]);
				    let tile_2 = document.getElementById(memory_tile_ids[1]);
				    tile_1.classList.toggle("flipped");
			        tile_2.classList.toggle("flipped");
				    tile_1.style.background = 'url(images/cardtop.jpg) no-repeat';
				    tile_1.style.backgroundSize = 'cover';
				    tile_1.innerHTML = "";
				    tile_2.style.background = 'url(images/cardtop.jpg) no-repeat';
				    tile_2.style.backgroundSize = 'cover';
            	    tile_2.innerHTML = "";

				    // Clear both arrays
				    memory_values = [];
            	    memory_tile_ids = [];
				};
				setTimeout(flip2Back, 700);
			}
		}
	}
	document.getElementById('moves').innerHTML=moveCount;
}

window.addEventListener("load", newBoard());


