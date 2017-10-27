
/* CHANGE DISPLAY DIVS */

function closeAllDivs(){
	document.getElementById("rules").style.visibility = "hidden";
	document.getElementById("game").style.visibility = "hidden";
	document.getElementById("popupLogin").style.visibility = "hidden";
	document.getElementById("settings").style.visibility = "hidden";
	document.getElementById("score").style.visibility = "hidden";
}

function changeDivs(clickedItemID){

		closeAllDivs();
		if(clickedItemID == 'game2'){ 
			startGame();
			document.getElementById('game').style.visibility = "visible";
		}
		else if(clickedItemID == 'game' && gameISover == 1){
			startGame();
			document.getElementById(clickedItemID).style.visibility = "visible";
		}
		else if(clickedItemID == 'game') document.getElementById(clickedItemID).style.visibility = "visible";
		else document.getElementById(clickedItemID).style.visibility = "visible";
}

/* GAME */

var circles; // array bidimensional of circles
var player_remove;
var pc_remove;
var who_plays = 0;
var numOfColumns = 3; // Number of columns set by the user
var dificulty = 0;

var matrix = Array(numOfColumns);
var array = Array(numOfColumns);
var clicked = Array(numOfColumns); // clicked = [[,,,,],[,,,,],[,,,,]]
//var game = document.getElementById("game");
var gameISover;

function init_arrays(){
	var i, j;

	for(i = 0 ; i < numOfColumns ; i++) matrix[i] = Array(i);

	for(i = 0 ; i < numOfColumns ; i++) clicked[i] = Array(i);

	for(i = 0 ; i < numOfColumns ; i++)
		for(j = 0 ; j < i ; j++)
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

		gameISover = 0;
		console.log("startGame");
		console.log("who_plays: " + who_plays);

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
			alert("Player You Won!");
			gameISover = 1;
			closeAllDivs();
			flag = false;
		}

		player_remove = false;
		if(flag) pc_move(); 
	}
	else{ alert("Wait for the computer turn to end"); }
}


function pc_move(){
	console.log("pc move");
	var sum;
	var j;
	var k;

	if(dificulty == 1) var algorithm = Math.floor((Math.random() * 2) + 0); // dificulty normal

	if((algorithm == 0 && dificulty == 1) || dificulty == 0){	//random algorithm
		// To dont select circles that was previous selected
		do{ 
			var columnToRemove = Math.floor((Math.random() * numOfColumns) + 0);
			var orderToRemove =  Math.floor((Math.random() * columnToRemove) + 0);
			console.log("while: " + "[" + columnToRemove + "][" + orderToRemove + "]");
		} while(clicked[columnToRemove][orderToRemove] == 1);

		console.log("[" + columnToRemove + "][" + orderToRemove + "]");
		
		setTimeout(function(){ for (j=circles[columnToRemove].length-1 ; j >= orderToRemove ; j--) {  // j starts on the top of the column and will clean until dont find the clicked position
				clicked[columnToRemove][j] = 1;
				circles[columnToRemove][j].element.parentNode.        // an object can only be deleted by his parent
				removeChild(circles[columnToRemove][j].element); 	// remove the element
				circles[columnToRemove].pop(); 				// remove the object // remove the circle (and div) // pop method could be used in arrays
			}}, 1000);
	}
	else{ // difficulty hardest
		var sum = Array(numOfColumns);
		var bigger_number = 0;
		var odd_index = [];

		odd_index[0] = -1;

		for(i = 0 ; i < numOfColumns ; i++) sum[i] = 0;

		for(i = 0 ; i < numOfColumns ; i++)
			for(j = 0 ; j < numOfColumns ; j++) matrix[i][j] = 0;

		for(i = 0 ; i < numOfColumns ; i++){
			x = circles[i].length;
			//console.log("x: " + x);
			var j = 0;
			while ( x >= 2){
				matrix[i][j] += x%2;
				console.log(x % 2);  
				x = Math.floor( x / 2);	
				j++;
			}
			if(x > 0){
				console.log(x % 2); 
				matrix[i][j] += x % 2;
			}
		}
		for(i = 0 ; i < numOfColumns ; i++){
			for(j = 0 ; j < numOfColumns ; j++){
				console.log("i: " + i + " j: " + j + " " + "matrix[j][i]: " + matrix[j][i]);
				sum[i] += matrix[j][i];
			}
		} 

		for(i = 0 ; i < numOfColumns ; i++) console.log("i: " + i + " sum[i]: " + sum[i]);

		var it = 0;
		for(i = sum.length-1 ; i > 0 ; i--){
			if((sum[i] % 2) != 0){
				odd_index[it] = i;
				it++;
			}
		}

		/*for(i = 0 ; i < numOfColumns ; i++){
			if((sum[i] % 2) != 0){
				odd_index[it] = i;
				it++;
			}
		} */

		for(i = 0 ; i < odd_index.length ; i++) console.log("i: " + i + " odd_index[i]: " + odd_index[i]);

		for(i = 0 ; i < numOfColumns ; i++){
			for(j = 0 ; j < numOfColumns ; j++){
				if((matrix[j][i] == 1) && (isInArray(i, odd_index))){
					bigger_number = j;
					console.log("column_to_remove: " + bigger_number); // problema
				}
			}
		}

		var n = 0;
		var n_to_remove = 0;

		if(odd_index[0] == -1){ // if no odd sum play random (player can win)
			do{ 
			var columnToRemove = Math.floor((Math.random() * numOfColumns) + 0);
			var orderToRemove =  Math.floor((Math.random() * columnToRemove) + 0);
			console.log("while: " + "[" + columnToRemove + "][" + orderToRemove + "]");
			} while(clicked[columnToRemove][orderToRemove] == 1);

			console.log("[" + columnToRemove + "][" + orderToRemove + "]");

			setTimeout(function(){

				for (j=circles[columnToRemove].length-1 ; j >= orderToRemove ; j--){ // remove
					clicked[columnToRemove][j] = 1;
					circles[columnToRemove][j].element.parentNode.
					removeChild(circles[columnToRemove][j].element);
					circles[columnToRemove].pop(); 				
				}

			}, 1000);
		}
		else if(odd_index.length < 2){
			//n += Math.pow(2, odd_index[0);
			n = 1;
			n_to_remove = circles[bigger_number].length - n;

			console.log("circles[bigger_number].length: " + circles[bigger_number].length);

			console.log("<2  n_to_remove: " + n_to_remove);

			setTimeout(function(){for(j = circles[bigger_number].length-1 ; j >= n_to_remove ; j--){
				clicked[bigger_number][j] = 1; // normal dificulty
				circles[bigger_number][j].element.parentNode.
				removeChild(circles[bigger_number][j].element);
				circles[bigger_number].pop();
			}}, 1000);

			
		}
		else{
			for(j = 1 ; j < odd_index.length ; j++) n += Math.pow(2, odd_index[j]);
			
			n_to_remove = circles[bigger_number].length - n;

			console.log(">2  n_to_remove: " + n_to_remove);

			setTimeout(function(){for(j = circles[bigger_number].length-1 ; j >= n_to_remove ; j--){
				clicked[bigger_number][j] = 1; // normal dificulty
				circles[bigger_number][j].element.parentNode.
				removeChild(circles[bigger_number][j].element);
				circles[bigger_number].pop();
			}}, 1000);
		}
	}

	console.log("teste winning function");
	setTimeout(function(){if(winning_function()){ alert("Player You Lost!"); console.log("player you lost"); gameISover = 1; closeAllDivs(); }}, 1200);

	setTimeout(function(){ player_remove = true; }, 1300);
}

function winning_function(){
	var flag = true;

	for(var i = 0; i < circles.length ; i++){ // circles.length = number of columns
		//console.log("circles[i].length " + circles[i].length);
 		if(circles[i].length != 0) flag = false;
    }
    console.log("flag: " + flag);
    return flag;
}

function login(){
	console.log(document.getElementById('username').value);
	console.log(document.getElementById('password').value);
}

function closeLogin() {
	closeAllDivs();
    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
}

function send_configs(){

	//caso o user nao acabe o jogo
	for(var i=0 ; i < numOfColumns ; i++){
		for (var j = 0 ; j < i+1 ; j++) {
			if(!(circles[i][j] == null)){  
				console.log("saiu a meio");
				console.log("numOfColumns: " + numOfColumns);
				console.log("i: " + i + " j: " + j);
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
	else if(document.getElementById('hardest').checked){
		dificulty = document.getElementById('hardest').value;
	}		

	closeAllDivs();
	changeDivs('game2');
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}