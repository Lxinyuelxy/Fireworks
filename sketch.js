var h5canvas;

var ctx;
function setup() {
	//createCanvas(windowWidth, windowHeight);
	noCanvas();
	//frameRate(10);
	h5canvas = document.getElementById("h5canvas");
	h5canvas.width = window.innerWidth;
	h5canvas.height = window.innerHeight;
	ctx = h5canvas.getContext('2d');
	createMeteor(ctx);	
	
}

function draw() {
	clear();
	updateFireworks(ctx);
	updateMeteor(ctx);
	createHill(ctx);	
}


function mousePressed(){
	var temp = Math.random();
	if(temp < 0.3){
		createFireworks(mouseX, mouseY);
	}else if(temp < 0.6){
		createFireworks3(mouseX, mouseY);
	}else{
		createFireworks2(mouseX, mouseY);
	}
	
}

