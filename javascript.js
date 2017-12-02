
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
var LoginObj={};
var JoinObj = {};
var update = 0;
var gameINcourse = false;
var who_plays;
var updatee = 0;
var winning_online = false;

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
    console.log("winning: " + flag);
    return flag;
}

function closeLogin(){
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



/* 	
-------------------------
|	2º DELIVER  		|					
-------------------------
*/


function ScoreBoard(){
	score_flag = 1;

	if(document.getElementById('offline').selected){

		for(var j = 1 ; j <= 10 ; j++){
	 		console.log("delete");
	 		if(document.getElementById("td"+j) != null){
				var element = document.getElementById("td"+j);
				element.parentNode.removeChild(element);
			}
		}

		var of = document.getElementById("Score_GameLevel");
		var size_value = of.options[of.selectedIndex].value;

		var text = document.createTextNode("localhost " + score[0] + " easy");
		var text2 = document.createTextNode(" localhost " + score[1] + " normal");
		var text3 = document.createTextNode(" localhost " + score[2] + " hardest");
		score_node[0] = document.createElement("div");
		score_node[0].appendChild(text);
		score_node[0].appendChild(text2);
		score_node[0].appendChild(text3);
		document.getElementById("body_scores").appendChild(score_node[0]);
    }
 	else{ 
	 	for(var j = 1 ; j <= 10 ; j++){
	 		console.log("delete");
	 		if(document.getElementById("td"+j) != null){
				var element = document.getElementById("td"+j);
				element.parentNode.removeChild(element);
			}
		}
	 	//if(document.getElementById('online').selected){
	 			var o = document.getElementById("Score_GameLevel");
				var size_value = o.options[o.selectedIndex].value;
	    		console.log(size_value);
	    		var RankObj = {};
	    		RankObj.size = size_value;
				var string = new String("{}");
				var secondcall = false;

				var xhr = new XMLHttpRequest();
				xhr.open("POST", "http://twserver.alunos.dcc.fc.up.pt:8008/ranking", true);
				xhr.onreadystatechange = function(){
					if(xhr.readstate < 4) return;
					if(xhr.status == 200){
						var data = JSON.parse(xhr.responseText);
						if(data == string){
							alert("Ainda sem tabela classificativa");
						}
						else{
							var cont = 1;
							for(var i = 0 ; i < 10 ; i++){
								//if(secondcall) break
								console.log("i: " + i);
								var text = document.createTextNode("#" + cont + " " + data.ranking[i].nick + " " + data.ranking[i].victories + " " + data.ranking[i].games);
								score_node[i] = document.createElement("td");
								score_node[i].setAttribute("id","td"+cont);
								score_node[i].appendChild(text);
								document.getElementById("tr"+cont).appendChild(score_node[i]);
								cont++;
							}
							xhr.abort()
							//secondcall = true;
						}
					}
					/*else{
						alert(xhr.status);
					}*/
				}
				xhr.send(JSON.stringify(RankObj));
	    //}
	}
}

/*
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
					// canvas leaving
					alert(data);
					eventSource.close();
					closeAllDivs();
				}
			}
			else{
				alert(xhr.status);
			}
		}
		xhr.send(LoginObj);
	}
	else{} // OFFLINE GAME
}
*/
function join_match(){
	var flag = true;
	if(!gameINcourse){
		if(online){


			//caso o user deixe algum jogo offline em aberto
			for(var i=0 ; i < numOfColumns ; i++){
				for (var j = 0 ; j < i+1 ; j++) {
					if(!(circles[i][j] == null)){  
						circles[i][j].element.parentNode.        
						removeChild(circles[i][j].element); 	
						circles[j].pop();
					} 						
				}
			}

			JoinObj.group = 49;
			JoinObj.nick = LoginObj.nick;
			JoinObj.pass = LoginObj.pass;
			JoinObj.size = numOfColumns;

			var xhr = new XMLHttpRequest();
			xhr.open("POST", "http://twserver.alunos.dcc.fc.up.pt:8008/join", true);
			xhr.onreadystatechange = function(){
				if(xhr.readystate < 4) return;
				if(xhr.status == 200){
						var data = JSON.parse(xhr.responseText);
						game_value = data.game;
						//console.log("join done");
						console.log("game_value: " + game_value);
						xhr.abort()
						updateee();
				}
				//else{
				//	alert(xhr.status);
				//}
			}
			xhr.send(JSON.stringify(JoinObj));
		}
		else alert("you need to be online first");
	}
	else alert("you are already in a game");
}

function login(){
	var nick = document.getElementById('username').value;
	var pass = document.getElementById('password').value;
	var string = new String("{}");

	console.log(nick);
	console.log(pass);

	//LoginObj = {"nick": "" + nick + "" , "pass": "" + pass + ""}
	LoginObj.nick = nick;
	LoginObj.pass = pass;


	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://twserver.alunos.dcc.fc.up.pt:8008/register", true);
	xhr.onreadystatechange = function(){
		if(xhr.readystate < 4) return;
		if(xhr.status == 200){
			var data = JSON.parse(xhr.responseText);
			//alert(data);
			if(!(data == string)){
				//console.log("Login Done"); // teste123 123  ou  mac mac
				alert("Login Done");
				online = true;
				xhr.abort()
			}
		}
		//else{
		//	alert(xhr.status);
		//}
	}
	xhr.send(JSON.stringify(LoginObj));
}

function updateee(){
	//console.log(game_value);
	updatee = 0;
	var eventSource = new EventSource("http://twserver.alunos.dcc.fc.up.pt:8008/update?nick="+LoginObj.nick+"&game="+game_value);

	eventSource.addEventListener('message',function(e){
		/*if(winning_online){
			console.log("closing server");
			gameINcourse = false;
			eventSource.close();
		}*/
		var data = JSON.parse(e.data);
		console.log("update  turn " + data.turn);
		console.log("updatee: " + updatee);
		who_plays = data.turn;
		if(updatee == 0){
			console.log("online game started");
			gameINcourse = true;
			startGame_online();
		}
		else{
			if(LoginObj.nick == data.turn || (typeof(who_plays) == 'undefined')){
				// remove the circles to the circle that the other player clicked
				for(var j=circles[data.stack].length-1 ; j >= data.pieces ; j--){
					circles[data.stack][j].element.parentNode.
					removeChild(circles[data.stack][j].element);
					circles[data.stack].pop();
				}
			}

			var win = false;
			for(var i = 0; i < numOfColumns ; i++){
				if(data.rack[i] == 0) win = true;
				else{
					win = false;
					break;
				}
			}
			if(win){
				if(winning_online == false) alert("You LOST");
				console.log("closing server");
				gameINcourse = false;
				eventSource.close();
			}
		}
		updatee = 1;
	}, false);
			/* CANVAS
			var tela = document.getElementById('game_started');
			var gc = tela.getContext("2d");

			gc.fillStyle = "purple";
			gc.font = '32px serif';
			gc.fillText("GAME IS ABOUT TO START!", 100,100);

			*/
}

function notify(column, order){
	var NotifyObj = {}

	NotifyObj.nick = LoginObj.nick;
	NotifyObj.pass = LoginObj.pass;
	NotifyObj.game = game_value;
	NotifyObj.stack = column;
	NotifyObj.pieces = order;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://twserver.alunos.dcc.fc.up.pt:8008/notify", true);
	xhr.onreadystatechange = function(){
		if(xhr.readystate < 4) return;
		if(xhr.status == 200){
			//var data = JSON.parse(xhr.responseText);
			xhr.abort();
		}
		//else console.log("notify status: " + xhr.status);
	}
	xhr.send(JSON.stringify(NotifyObj));
}

function playerremove_online(){
	//console.log("who_starts_playing: " + who_starts_playing);
	//console.log("LoginObj.nick : " + LoginObj.nick);
	if(who_plays == LoginObj.nick){
		var notify_flag = true;
		// Canvas your turn

		// remove the circles to the circle that the player clicked
		for(var j=circles[this.column].length-1 ; j >= this.order ; j--){
			//console.log("column: " + this.column);
			circles[this.column][j].element.parentNode.
			removeChild(circles[this.column][j].element);
			circles[this.column].pop();
			if(notify_flag){
				notify(this.column, this.order);
				notify_flag = false;
			}
		}

		if(winning_function()){
			winning_online = true;
			alert("You WON!");
			// LoginObj.nick won
			// score update
		}
	}
	else alert("Not your turn to play");
}

function startGame_online(){
	var i, j;

	init_arrays();

	circles = Array(JoinObj.size);
    for (j=0; j<JoinObj.size; j++) circles[j] = Array(j); 

    console.log("populate");

    // Populate MainStage with circles
    for (i=0; i<circles.length; i++) {
        for (j=0; j<i+1; j++) {
            circles[i][j] = new Circle(((i * 140)), (720 - (100 + j * 100)), i, j); // first 100 controlos bottom property // second 100 controls left // 140 controls right // 720 controls top property // i * dx and py + j * py will allow the divs with the circles to dont overlap
            game_board.appendChild(circles[i][j].element); // game is parentNode
            circles[i][j].element.classList.add("circle_div"); // add className to the divs
            circles[i][j].element.addEventListener("click", playerremove_online.bind(circles[i][j])); /* circles[i][j].element.setAtribute("onclick", "remove();"); */
            // Specify location of each circle
            circles[i][j].element.style.left = circles[i][j].pos_x + "px";
            circles[i][j].element.style.top = circles[i][j].pos_y + "px";
        }
    }

    changeDivs("game_board");
}