
/* CHANGE DISPLAY DIVS */

function closeAllDivs(){
	document.getElementById("rules").style.visibility = "hidden";
	document.getElementById("game_board").style.visibility = "hidden";
	document.getElementById("popupLogin").style.visibility = "hidden";
	document.getElementById("settings").style.visibility = "hidden";
	document.getElementById("score").style.visibility = "hidden";
}

function changeDivs(clickedItemID){

		//if(score_flag == 1){
			//score_node[0].parentNode.
			//removeChild(score_node[0]);
		//}

		closeAllDivs();
		if(clickedItemID == 'game2'){ 
			startGame();
			document.getElementById('game_board').style.visibility = "visible";
		}
		else if(clickedItemID == 'game_board' && gameISover == 1){
			startGame();
			document.getElementById(clickedItemID).style.visibility = "visible";
		}
		else if(clickedItemID == 'game_board') document.getElementById(clickedItemID).style.visibility = "visible";
		else document.getElementById(clickedItemID).style.visibility = "visible";
}

/* GAME */

var circles; // array bidimensional of circles
var player_remove;
var pc_remove;
var who_plays = 0;
var numOfColumns = 3; // Number of columns set by the user
var dificulty = 0;
var online = false;
var game_value;
var LoginObj = {};

var matrix = Array(numOfColumns);
var array = Array(numOfColumns);
var clicked = Array(numOfColumns); // clicked = [[,,,,],[,,,,],[,,,,]]
//var game = document.getElementById("game");
var gameISover;
var score = Array(3);
var score_flag = 0;

for ( i = 0 ; i < 3 ; i++) score[i] = 0;

var score_node = Array(1);

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

function startGame_online(who_starts_playing){
	var i, j;

	circles = Array(numOfColumns);
        for (j=0; j<numOfColumns; j++)
            circles[j] = Array(j); 

    init_arrays();

    // Populate MainStage with circles
    for (i=0; i<circles.length; i++) {
        for (j=0; j<i+1; j++) {
            circles[i][j] = new Circle(((i * 140)), (720 - (100 + j * 100)), i, j); // first 100 controlos bottom property // second 100 controls left // 140 controls right // 720 controls top property // i * dx and py + j * py will allow the divs with the circles to dont overlap
            game_board.appendChild(circles[i][j].element); // game is parentNode
            circles[i][j].element.classList.add("circle_div"); // add className to the divs
            circles[i][j].element.addEventListener("click", playerremove.bind(circles[i][j])); /* circles[i][j].element.setAtribute("onclick", "remove();"); */
            // Specify location of each circle
            circles[i][j].element.style.left = circles[i][j].pos_x + "px";
            circles[i][j].element.style.top = circles[i][j].pos_y + "px";
        }
    }

    playerremove_online(who_starts_playing);
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
                game_board.appendChild(circles[i][j].element); // game is parentNode
                circles[i][j].element.classList.add("circle_div"); // add className to the divs
                circles[i][j].element.addEventListener("click", playerremove.bind(circles[i][j])); /* circles[i][j].element.setAtribute("onclick", "remove();"); */
                // Specify location of each circle
                circles[i][j].element.style.left = circles[i][j].pos_x + "px";
                circles[i][j].element.style.top = circles[i][j].pos_y + "px";
            }
        }

    if(pc_remove) pc_move();
}


function playerremove_online(who_starts_playing){
	if(who_starts_playing == LoginObj.nick){
		
	}
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
			if(dificulty == 0) score[0]++;
			else if(dificulty == 1) score[1]++;
			else score[2]++;
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
	console.log(login);
	var nick = document.getElementById('username').value;
	var pass = document.getElementById('password').value;
	var string = new String("{}");

	if(pass != "" && nick != ""){
		LoginObj.nick = nick;
		LoginObj.pass = pass;

		var xhr = new XMLHttpRequest();
		xhr.open("POST","http://twserver.alunos.dcc.fc.up.pt:8008/register", true);
		xhr.onreadystatechange = function(){
			if(xhr.readstate < 4) return;
			if(xhr.status == 200){
				var data = JSON.parse(xhr.responseText);
				if(!(data == string)){
					alert(data);
					console.log("login_done")
					online = true;
				}
			}
			else{
				alert(xhr.status);
			}
		}
		xhr.send(JSON.stringify(LoginObj));
	}

	

	/*

	LoginObj = {"nick":"\" + nick + \"", "password":"" + pass + ""}

	//var print = JSON.parse(LoginObj);
	console.log(LoginObj);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://twserver.alunos.dcc.fc.up.pt:8008/register", true);
	xhr.onreadystatechange = function(){
		console.log("readystate-login");
		if(xhr.readstate < 4) return;
		if(xhr.status == 200){
			var data = JSON.parse(xhr.responseText);
			if(!(data == string)){
				alert(data);
				console.log("login_done")
				online = true;
			}
		}
		else{
			alert(xhr.status);
		}
	}
	xhr.send(LoginObj); */
}

function closeLogin(){
	closeAllDivs();
    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
}

function join_match(){
	//online = true; // DEBUG
	if(online){
		JoinObj = { "group": 49, "nick": "" + LoginObj.nick + "", "pass": "" + LoginObj.pass + "", "size": numOfColumns }
		// DEBUG:
		//JoinObj = { "group": 49, "nick": "andre", "pass": "123", "size": numOfColumns }

		var xhr = new XMLHttpRequest();
		xhr.open("POST", "http://twserver.alunos.dcc.fc.up.pt:8008/join", true);
		xhr.onreadystatechange = function(){
			console.log("readystate-join");
			if(xhr.readstate < 4) return;
			if(xhr.status == 200){
				var data = JSON.parse(xhr.responseText);
				game_value = data.game;
				console.log("game_value: " + game_value);
			}
			else{
				alert(xhr.status);
			}
		}
		xhr.send(JoinObj);

		update();
	}
	else alert("You need to login first")
}

function leave(){
	if(online){
		LeaveObj = { "nick": "" + LoginObj.nick + "", "pass": "" + LoginObj.pass + "", "game": "" + game_value + "" }
		var string = new String("{}");

		var xhr = new XMLHttpRequest();
		xhr.open("POST", "http://twserver.alunos.dcc.fc.up.pt:8008/leave", true);
		xhr.onreadystatechange = function(){
			console.log("readysstate-leave");
			if(xhr.readstate < 4) return;
			if(xhr.status == 200){
				var data = JSON.parse(xhr.responseText);
				if(!(data == string)){
					alert(data);
					eventSource.close();
				}
			}
			else{
				alert(xhr.status);
			}
		}
		xhr.send(LoginObj);
	}
	else{}
}

function notify(){
}

function update(){
	// server event // espera que encontra jogo // Se encontrar jogo -> imagem no canvas -> aparece o tabuleiro // e comecam a jogar usando a funçao notify sempre que uma jogado for feita
	var url = "http://twserver.alunos.dcc.fc.up.pt:8008/update?nick="+LoginObj.nick+"&game="+game_value+"";
	var string = new String("{}");

	var eventSource = new EventSource("url");

	if(eventSource.readstate == 1) console.log("eventSource OPEN");

	eventSource.onmessage = function(event){
		var data = JSON.parse(event.data);
		if(data != string){
			// CANVAS GAME STARTED
			var who_starts_playing = data.turn;
			console.log("who starts playing " + who_starts_playing); 
			console.log("online game started");
			startGame_online(who_starts_playing);
		}
	}
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

function ScoreBoard(){
	score_flag = 1;

		/*if(document.getElementById('offline').selected){
			if(document.getElementById('easy_option').selected) var text = document.createTextNode("#1" + " localhost " + score[0] + " easy");
			else if(document.getElementById('normal_option').selected) var text = document.createTextNode("#1" + " localhost " + score[1] + " normal");
			else if(document.getElementById('hardest_option').selected) var text = document.createTextNode("#1" + " localhost " + score[2] + " hardest");
			score_node[0] = document.createElement("div");
			score_node[0].appendChild(text);
			document.getElementById("body_scores").appendChild(score_node[0]);
			//score_node.style.width = "200px";
			//score_node.style.display = "inline";
    	}
 else */if(document.getElementById('online').selected){
 			var o = document.getElementById("Score_GameLevel");
			var size_value = o.options[o.selectedIndex].value;
    		console.log(size_value);
    		rankObj = { "size": "" + size_value + "" }
			var string = new String("{}");

			var xhr = new XMLHttpRequest();
			xhr.open("POST", "http://twserver.alunos.dcc.fc.up.pt:8008/ranking", true);
			xhr.onreadystatechange = function(){
				console.log("readysstate-leave");
				if(xhr.readstate < 4) return;
				if(xhr.status == 200){
					var data = JSON.parse(xhr.responseText);
					if(data == string){
						alert("Ainda sem tabela classificativa");
					}
					else{
						for(var i = 0 ; i < data.length ; i++){
							var cont = 0;
							var text = document.createTextNode("#" + cont + " " + data.ranking[i].nick + " " + data.ranking[i].victories + " " + data.ranking[i].games);
							score_node[0] = document.createElement("div");
							score_node[0].appendChild(text);
							document.getElementById("body_scores").appendChild(score_node[0]);
							cont++;
						}
					}
				}
				else{
					alert(xhr.status);
				}
			}
			xhr.send(rankObj);
    	}
}