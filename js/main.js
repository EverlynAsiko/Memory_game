let memory_array = ['images/burundi.jpeg','images/burundi.jpeg','images/djibouti.jpeg',
'images/djibouti.jpeg','images/eritrea.jpeg','images/eritrea.jpeg','images/ethiopia.jpeg',
'images/ethiopia.jpeg','images/kenya.jpg','images/kenya.jpg','images/rwanda.jpeg',
'images/rwanda.jpeg','images/tanzania.jpeg','images/tanzania.jpeg','images/uganda.jpg',
'images/uganda.jpg'];
let memory_values = [];
let memory_tile_ids = [];
let tiles_flipped = 0;
let moveCount=0;
let clicked = false;
let sec = 0;
let minute=0;


function startClock() {
    if (clicked === false) {
        clock = setInterval("stopWatch()", 1000);
        clicked = true;
    }
}

function stopWatch() {
    sec++;
    if (sec===60){
    	minute++;
    	sec=0;
    }
    document.getElementById("timer").innerHTML = minute+"."+sec;
}

function stopClock() {
    sec = 0;
    minute=0;
    document.getElementById("timer").innerHTML= minute+"."+sec;
    clicked = false;
}

function rating(){
		stars=5;
		if (moveCount > 16 && moveCount <= 24){
			document.getElementById('star5').style.visibility = "hidden";
			stars=4;
	    }
	    else if (moveCount > 24 && moveCount <= 32){
	    	document.getElementById('star4').style.visibility = "hidden";
	    	stars=3;
	    }
	    else if (moveCount > 32 && moveCount <= 48){
	    	document.getElementById('star3').style.visibility = "hidden";
	    	stars=2;
	    }
	    else if (moveCount > 48){
	    	document.getElementById('star2').style.visibility = "hidden";
	    	stars=1;
	    }
	}

// Shuffle function from http://stackoverflow.com/a/2450976
Array.prototype.memory_tile_shuffle = function(){
    let i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function newBoard(){
	tiles_flipped = 0;
	let output = '';
    memory_array.memory_tile_shuffle();
	for(let i = 0; i < memory_array.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\'<img src='+memory_array[i]+'>\')"></div>';
	}
	document.getElementById('memory_board').innerHTML = output;
	moveCount=0;
	document.getElementById('moves').innerHTML=moveCount;
	stopClock();
}

function memoryFlipTile(tile,val){
	moveCount++;
	startClock();
	rating();
	
	if(tile.innerHTML == "" && memory_values.length < 2){
		tile.innerHTML = val;
		if(memory_values.length == 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
		} else if(memory_values.length == 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1]){
				tiles_flipped += 2;
				let tile_1 = document.getElementById(memory_tile_ids[0]);
				let tile_2 = document.getElementById(memory_tile_ids[1]);
				tile_1.classList.add("fade");
				tile_2.classList.add("fade");
				// Clear both arrays
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
				    // Flip the 2 tiles back over
				    let tile_1 = document.getElementById(memory_tile_ids[0]);
				    let tile_2 = document.getElementById(memory_tile_ids[1]);
				    tile_1.classList.add("flipped");
			        tile_2.classList.add("flipped");
				    tile_1.style.background = 'url(images/cardtop.jpg) no-repeat';
				    tile_1.style.backgroundSize = 'cover';
				    tile_1.innerHTML = "";
				    tile_2.style.background = 'url(images/cardtop.jpg) no-repeat';
				    tile_2.style.backgroundSize = 'cover';
            	    tile_2.innerHTML = "";
				    // Clear both arrays
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
	document.getElementById('moves').innerHTML=moveCount;
}

window.addEventListener("load", newBoard());


