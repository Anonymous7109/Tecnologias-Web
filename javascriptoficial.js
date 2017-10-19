/* CHANGE DISPLAY DIVS */

function closeAllDivs(){
	document.getElementById("rules").style.visibility = "hidden";
	document.getElementById("game").style.visibility = "hidden";
	document.getElementById("popupLogin").style.visibility = "hidden";
}

function changeDivs(clickedItemID){

		closeAllDivs();
		if(clickedItemID == "game") startGame();
		document.getElementById(clickedItemID).style.visibility = "visible";
}

/* GAME */

var tokens;
var px = 700/5, py = 500/5; 					// space between divs
var playArea = document.getElementById("game");
//var remove_player = true;

 var Token = function (pos_x, pos_y, heap, order) {			// Create object
        this.pos_x = pos_x;                                 // X position for CSS left property
        this.pos_y = pos_y;                                 // Y position for CSS top property
        this.element = document.createElement("div");       // HTML element placed in DOM
        this.element.heap = heap;                           // Index values that correspond to the heap
        this.element.order = order;                         // tokens array, ex tokens[heap][order]
        //this.element.remove = remove_player(); 

        this.remove = function(event){
		        console.log("[" + this.element.heap + "][" + this.element.order + "]");

		        // Remove the element and the object
		        for (var j=tokens[this.element.heap].length-1 ; j >= this.element.order ; j--) {
		        	console.log("j: " + j + " order: " + this.element.order);
		            tokens[this.element.heap][j].element.parentNode.
		            removeChild(tokens[this.element.heap][j].element); 		// remove the element
		            tokens[this.element.heap].pop(); 						// remove the object
		        }

		        if (tokens[this.element.heap].length === 0) {
		            for (var i=this.element.heap+1; i<tokens.length; i++)
		                for (j=0; j<tokens[i].length; j++)
		   	                tokens[i][j].element.heap--;
		            tokens.splice(this.element.heap, 1);
		        } 
		} 

    	this.element.addEventListener("click", this.remove.bind(this), false);  
}

function startGame() {
        var numOfHeaps = 3; // Number of heaps in this round     

        // Create a random 2D array for storing the Token objects
        // First index represents the heap, second index represents the Token in each heap
        tokens = Array(numOfHeaps); // create tokens[i] = nº heaps
        for (var i=0; i<numOfHeaps; i++)
            tokens[i] = Array(i); // create tokens[i][j] // tokens[5][5]

        // Populate MainStage with tokens
        for (i=0; i<tokens.length; i++) {
            for (var j=0; j<i+1; j++) {
                tokens[i][j] = new Token(((i * px)), (720 - (py + j * py)), i, j); // 200 controls left property // 620 controls right property // i * dx and py + j * py will allow the divs with the circles to dont overlap
                game.appendChild(tokens[i][j].element);
                tokens[i][j].element.classList.add("circle_div");

                // Specify location of each token
                tokens[i][j].element.style.left = tokens[i][j].pos_x + "px";
                tokens[i][j].element.style.top = tokens[i][j].pos_y + "px";
            }
        }

        player_move();
}

function player_move(){

	/*function remove_player(event) {
        	//console.log(remove_player);
        	if(remove_player){
		        console.log("[" + this.element.heap + "][" + this.element.order + "]");

		        // Remove the element and the object
		        for (var j=tokens[this.element.heap].length-1 ; j >= this.element.order ; j--) {
		        	console.log("j: " + j + " order: " + this.element.order);
		            tokens[this.element.heap][j].element.parentNode.
		            removeChild(tokens[this.element.heap][j].element); 		// remove the element
		            tokens[this.element.heap].pop(); 						// remove the object
		        }

		        if (tokens[this.element.heap].length === 0) {
		            for (var i=this.element.heap+1; i<tokens.length; i++)
		                for (j=0; j<tokens[i].length; j++)
		   	                tokens[i][j].element.heap--;
		            tokens.splice(this.element.heap, 1);
		        } 
		    }
		} 

    	this.element.addEventListener("click", remove_player.bind(this), false); */

	if(winning_function()) alert("you WON!");
	else{
		pc_move();
		remove_player = false;
	}
}

function pc_move(){}

function winning_function(){
	var flag = true;

	for(var i = 0; i < tokens.length ; i++){ // tokens.length = number of heaps
		console.log("tokens[i].length " + tokens[i].length);
 		if(tokens[i].length != 0) flag = false;
    	else flag = true;	
    }

    return flag;
}
