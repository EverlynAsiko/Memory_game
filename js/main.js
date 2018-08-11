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
				// Clear both arrays
				memory_values = [];
            	memory_tile_ids = [];
				// Check to see if the whole board is cleared
				if(tiles_flipped == memory_array.length){
					alert("YOU ARE ON FIRE!... Play again?");
					document.getElementById('memory_board').innerHTML = "";
					newBoard();
					moveCount=0;
					stopClock();
				}
			} else {
				function flip2Back(){
				    // Flip the 2 tiles back over
				    let tile_1 = document.getElementById(memory_tile_ids[0]);
				    let tile_2 = document.getElementById(memory_tile_ids[1]);
				    tile_1.style.background = 'url(images/cardtop.jpg) no-repeat';
            	    tile_1.innerHTML = "";
				    tile_2.style.background = 'url(images/cardtop.jpg) no-repeat';
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

function rating(){
	let star=[document.getElementById("rating").childNodes[0].nodeValue,
	document.getElementById("rating").childNodes[1].nodeValue,
	document.getElementById("rating").childNodes[2].nodeValue,
	document.getElementById("rating").childNodes[3].nodeValue,
	document.getElementById("rating").childNodes[4].nodeValue,];
	if (moves > 8 && moves < 12){
		star[4].style.visibility = "hidden";
    }
    else if (moves > 13){
    	star[3].style.visibility = "hidden";
    }
}


window.addEventListener("load", newBoard());


