var h5canvas;

var ctx;
function setup() {
	noCanvas();
	//frameRate(2);
	h5canvas = document.getElementById("h5canvas");
	h5canvas.width = window.innerWidth;
	h5canvas.height = window.innerHeight;
	ctx = h5canvas.getContext('2d');
	createMeteor(ctx);	
	
}

function draw() {
	updateFireworks(ctx);
	updateMeteor(ctx);
	createHill(ctx);	
}


function mousePressed(){
	createFireworks2(mouseX, mouseY);
}

