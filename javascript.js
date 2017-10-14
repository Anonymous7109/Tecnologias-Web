// SHOW / HIDE  DIVs

function show_rules(){
	document.getElementById('rules').style.visibility = 'visible';
	document.getElementById('play').style.visibility = 'hidden';
	document.getElementById('account').style.visibility = 'hidden';
	document.getElementById('config').style.visibility = 'hidden';
	document.getElementById('rank').style.visibility = 'hidden';
}

function show_rank(){
	document.getElementById('rules').style.visibility = 'hidden';
	document.getElementById('play').style.visibility = 'hidden';
	document.getElementById('account').style.visibility = 'hidden';
	document.getElementById('config').style.visibility = 'hidden';
	document.getElementById('rank').style.visibility = 'visible';
}

function show_account(){
	document.getElementById('rules').style.visibility = 'hidden';
	document.getElementById('play').style.visibility = 'hidden';
	document.getElementById('account').style.visibility = 'visible';
	document.getElementById('config').style.visibility = 'hidden';
	document.getElementById('rank').style.visibility = 'hidden';
}

function show_config(){
	document.getElementById('rules').style.visibility = 'hidden';
	document.getElementById('play').style.visibility = 'hidden';
	document.getElementById('account').style.visibility = 'hidden';
	document.getElementById('config').style.visibility = 'visible';
	document.getElementById('rank').style.visibility = 'hidden';
}

function show_game(){
	document.getElementById('rules').style.visibility = 'hidden';
	document.getElementById('play').style.visibility = 'visible';
	document.getElementById('account').style.visibility = 'hidden';
	document.getElementById('config').style.visibility = 'hidden';
	document.getElementById('rank').style.visibility = 'hidden';

	new_game(); 
}

function new_game(){ // criar um novo botao
		for(var i = 1 ; i < total_circles+1 ; i++){
			document.images[i].style.visibility = 'visible';
		}

		for(var i = 0 ; i < rows ; i++) array[i] = 0; 
}

// BUTTONS CALL FUNCTIONS


function login(){
	console.log(document.getElementById('username').value);
	console.log(document.getElementById('pswd').value);
}

function input_nrows(){
	console.log(document.getElementById('tamanho_tabuleiro'));
}

function input_retirar1(){
	players_move('input_retirar1', 0);
}

function input_retirar2(){
	players_move('input_retirar2', 1);
}

function input_retirar3(){
	players_move('input_retirar3', 2);
}

function input_retirar4(){
	players_move('input_retirar4', 3);
}


// GAME IA
var rows = 4;
var ncircles = 5;
var total_circles = rows * ncircles;
images=new Array();
array = [rows];
var winning;

//for(var i = 0 ; i < rows ; i++) array[i] = 0; 

function players_move(a, column){ 
	var n_pecas_retirar = document.getElementById(a).value;
	//console.log("column: " + column);
	//console.log("ncircles: " + ncircles);
	//console.log("array[column]: ", array[column]);
	var start = parseInt(column) * parseInt(ncircles) + parseInt(1) + parseInt(array[column]); // +1 é porque a 1 imagem é o logotipo
	//console.log("start: " + start);
	var stop = parseInt(start) + parseInt(n_pecas_retirar); 
	//console.log("stop: " + stop);

	if(n_pecas_retirar > (ncircles - array[column])) alert("That number of pieces is unavailable");
	else{
		for(i = start ; i < stop ; i++){
		//console.log("i: " + i);
		document.images[i].style.visibility = 'hidden';    
		}

		array[column] += parseInt(n_pecas_retirar); 

		winning = winning_function();
		console.log("winning: " + winning);

		if(winning == 1) alert("You WON!");
	}
}

function winning_function(){ 
	var flag = 1;

	for(var i = 0 ; i < rows ; i++){
		if(array[i] != ncircles){ 
			flag = 0;
			break;
		}
	}

	return flag;
}


// function pc move // function random