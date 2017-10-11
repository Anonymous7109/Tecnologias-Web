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

// 

