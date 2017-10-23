/* CHANGE DISPLAY DIVS */

function closeAllDivs(){
	document.getElementById("rules").style.visibility = "hidden";
	document.getElementById("game").style.visibility = "hidden";
	document.getElementById("popupLogin").style.visibility = "hidden";
	document.getElementById("settings").style.visibility = "hidden";
}

function changeDivs(clickedItemID){

		closeAllDivs();
		if(clickedItemID == "game") startGame();
		document.getElementById(clickedItemID).style.visibility = "visible";
}

/* GAME */

var circles; // array bidimensional of circles
var player_remove;
var pc_remove;
var who_plays = 0;
var numOfColumns = 3; // Number of columns set by the user
var dificulty = 0;

var binary = Array(numOfColumns);

var clicked = Array(numOfColumns); // clicked = [[,,,,],[,,,,],[,,,,]]
//var game = document.getElementById("game");

function init_arrays(){
	var i;

	for(i = 0 ; i < numOfColumns ; i++) binary[i] = 0;

	for(i = 0 ; i < numOfColumns ; i++) clicked[i] = Array(i);

	for(i = 0 ; i < numOfColumns ; i++)
		for(var j = 0 ; j < i ; j++)
			clicked[i][j] = 0;
}

var Circle = function (pos_x, pos_y, column, order) {		   // Create object
    this.pos_x = pos_x;                               	  // X position for CSS left property
    this.pos_y = pos_y;                               	  // Y position for CSS top property
    this.element = document.createElement("div");     	  // HTML element placed in DOM // Oject has a div propriety
    this.column = column;                          			  // Index values that correspond to the column // Object has a column propriety that tells is div
   	this.order = order;                        			 // circles array, ex circles[column][order]	// 
}

function startGame() {  
	var i, j;

		if(who_plays == 0){
			player_remove = true;
			pc_remove = false;
		}
		else{
			player_remove = false;
			pc_remove = true;
		}
		console.log("numOfColumns: " + numOfColumns);
		console.log("dificulty: " + dificulty);

        // Create array for storing the Circles objects
        // First index represents the column, second index represents the Circles in each column
        circles = Array(numOfColumns);
        for (j=0; j<numOfColumns; j++)
            circles[j] = Array(j); 

        init_arrays();

        // Populate MainStage with circles
        for (i=0; i<circles.length; i++) {
            for (j=0; j<i+1; j++) {
                circles[i][j] = new Circle(((i * 140)), (720 - (100 + j * 100)), i, j); // first 100 controlos bottom property // second 100 controls left // 140 controls right // 720 controls top property // i * dx and py + j * py will allow the divs with the circles to dont overlap
                game.appendChild(circles[i][j].element); // game is parentNode
                circles[i][j].element.classList.add("circle_div"); // add className to the divs
                circles[i][j].element.addEventListener("click", playerremove.bind(circles[i][j])); /* circles[i][j].element.setAtribute("onclick", "remove();"); */
                // Specify location of each circle
                circles[i][j].element.style.left = circles[i][j].pos_x + "px";
                circles[i][j].element.style.top = circles[i][j].pos_y + "px";
            }
        }

    if(pc_remove) pc_move();
}


function playerremove(){
	//   console.log("[" + this.column + "][" + this.order + "]");
	var flag = true;
		  	
	if(player_remove){
		// Remove the element and the object

		for (var j=circles[this.column].length-1 ; j >= this.order ; j--) {  // j starts on the top of the column and will clean until dont find the clicked position
			clicked[this.column][j] = 1;
			circles[this.column][j].element.parentNode.        // an object can only be deleted by his parent
			removeChild(circles[this.column][j].element); 	// remove the element
			circles[this.column].pop(); 						// remove the object // remove the circle (and div) // pop method could be used in arrays
		}

		if(winning_function()){ 
			alert("Player You LOST!");
			closeAllDivs();
			flag = false;
		}

		player_remove = false;
		if(flag) pc_move(); 
	}
	else{ alert("Wait for the computer turn to end"); }
}


function pc_move(){
	var sum;

	if(dificulty == 1) var algorithm = Math.floor((Math.random() * 2) + 0);

	if((algorithm == 0 && dificulty == 1) || dificulty == 0){	//random algorithm
		// To dont select circles that was previous selected
		do{ 
			var columnToRemove = Math.floor((Math.random() * numOfColumns) + 0);
			var orderToRemove =  Math.floor((Math.random() * columnToRemove) + 0);
			console.log("while: " + "[" + columnToRemove + "][" + orderToRemove + "]");
		} while(clicked[columnToRemove][orderToRemove] == 1);

		console.log("[" + columnToRemove + "][" + orderToRemove + "]");
		
		for (var j=circles[columnToRemove].length-1 ; j >= orderToRemove ; j--) {  // j starts on the top of the column and will clean until dont find the clicked position
				clicked[columnToRemove][j] = 1;
				circles[columnToRemove][j].element.parentNode.        // an object can only be deleted by his parent
				removeChild(circles[columnToRemove][j].element); 	// remove the element
				        circles[columnToRemove].pop(); 				// remove the object // remove the circle (and div) // pop method could be used in arrays
		}
	}
	else{
		x = 13;
		while ( x >= 2){
			var i = 0;
			binary[i] += x%2;
			console.log(x % 2); // 13 % 2 = 1 
			x = Math.floor( x / 2);	
			i++;
		}
		if(x > 0) binary[i] = x % 2;
		console.log(x % 2);
	}

	if(winning_function()){ 
			alert("Player You WON!");
			closeAllDivs();
		}

	player_remove = true;
}

function winning_function(){
	var flag = true;

	for(var i = 0; i < circles.length ; i++){ // circles.length = number of columns
		//console.log("circles[i].length " + circles[i].length);
 		if(circles[i].length != 0) flag = false;
    }

    return flag;
}

function login(){
	console.log(document.getElementById('username').value);
	console.log(document.getElementById('password').value);
}

function send_configs(){

	//caso o user nao acabe o jogo
	for(var i=0 ; i < numOfColumns ; i++){
		for (var j = 0 ; j < i+1 ; j++) {
			if(!(circles[i][j] == null)){  
				console.log("saiu a meio");
				circles[i][j].element.parentNode.        
				removeChild(circles[i][j].element); 	
				circles[j].pop();
			} 						
		}
	}

	var value = document.getElementById('n_columns').value;
	console.log(value);

	if((value > 8) || (value <= 2) && value != null) alert("select a number between 2 and 8");
	else numOfColumns = document.getElementById('n_columns').value;

	
	if(document.getElementById('player_start').checked){
		who_plays = document.getElementById('player_start').value;
	}
	else if(document.getElementById('pc_start').checked){
		who_plays = document.getElementById('pc_start').value;
	}
	

	if(document.getElementById('easy').checked){
		dificulty = document.getElementById('easy').value;
	}
	else if(document.getElementById('normal').checked){
		dificulty = document.getElementById('normal').value;
	}
	else if(document.getElementById('impossible').checked){
		dificulty = document.getElementById('impossible').value;
	}		

	closeAllDivs();
}