var h5canvas;


function setup() {
	noCanvas();
	h5canvas = document.getElementById("h5canvas");
	h5canvas.width = window.innerWidth;
	h5canvas.height = window.innerHeight;	
}

function draw() {	
	clear();
    if (h5canvas.getContext) {
		var ctx = h5canvas.getContext('2d');
		updateFireworks(ctx);
	}
}


function mousePressed(){
	createFireworks(mouseX, mouseY);	
	console.log("mouseX = "+mouseX+", mouseY = "+mouseY);
}

