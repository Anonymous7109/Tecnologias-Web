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

function show_play(){
	document.getElementById('rules').style.visibility = 'hidden';
	document.getElementById('play').style.visibility = 'visible';
	document.getElementById('account').style.visibility = 'hidden';
	document.getElementById('config').style.visibility = 'hidden';
	document.getElementById('rank').style.visibility = 'hidden';
}


function login(){
	console.log(document.getElementById('username').value);
	console.log(document.getElementById('pswd').value);
}

function input_nrows(){
	console.log(document.getElementById('tamanho_tabuleiro'));
}

function input_retirar1(){
	console.log(document.getElementById('input_retirar1'));
}

// 

