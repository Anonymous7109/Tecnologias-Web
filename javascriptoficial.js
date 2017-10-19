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




var Circle = function (pos_x, pos_y, heap, order) {			// Create object
    this.pos_x = pos_x;                                 // X position for CSS left property
    this.pos_y = pos_y;                                 // Y position for CSS top property
    this.element = document.createElement("div");       // HTML element placed in DOM // Oject has a div propriety
    this.heap = heap;                           // Index values that correspond to the heap // Object has a heap propriety that tells is div
   	this.order = order;                         // tokens array, ex tokens[heap][order]	// 

        this.remove = function(event){
		        console.log("[" + this.heap + "][" + this.order + "]");

		        // Remove the element and the object

		        for (var j=circles[this.heap].length-1 ; j >= this.order ; j--) {  // j starts on the top of the heap and will clean until dont find the clicked position
		            circles[this.heap][j].element.parentNode.        // an object can only be deleted by his parent
		            removeChild(circles[this.heap][j].element); 		// remove the element
		            circles[this.heap].pop(); 						// remove the object // remove the circle (and div) // pop method could be used in arrays
		        }
		} 

    	this.element.addEventListener("click", this.remove.bind(this), false);  
}

function startGame() {
        var numOfHeaps = 3; // Number of heaps in this round     

        // Create array for storing the Circles objects
        // First index represents the heap, second index represents the Circles in each heap
        circles = Array(numOfHeaps);
        for (var i=0; i<numOfHeaps; i++)
            circles[i] = Array(i); 

        // Populate MainStage with tokens
        for (i=0; i<circles.length; i++) {
            for (var j=0; j<i+1; j++) {
                circles[i][j] = new Circle(((i * 140)), (720 - (100 + j * 100)), i, j); // 200 controls left property // 620 controls right property // i * dx and py + j * py will allow the divs with the circles to dont overlap
                game.appendChild(circles[i][j].element); // game is parentNode
                circles[i][j].element.classList.add("circle_div"); // add className to the divs

                // Specify location of each token
                circles[i][j].element.style.left = circles[i][j].pos_x + "px";
                circles[i][j].element.style.top = circles[i][j].pos_y + "px";
            }
        }

        player_move();
}

function player_move(){

	/* does only one click / verify if wins / pc_move )
	/*   tokens[selectedCol][selectedTok].remove.bind(tokens[selectedCol][selectedTok]) 		*/

	/*if(winning_function()) alert("you WON!");
	else{
		pc_move();
		remove_player = false;
	} */
}

//function pc_move(){}

function winning_function(){
	var flag = true;

	for(var i = 0; i < tokens.length ; i++){ // tokens.length = number of heaps
		console.log("tokens[i].length " + tokens[i].length);
 		if(tokens[i].length != 0) flag = false;
    	else flag = true;	
    }

    return flag;
}
