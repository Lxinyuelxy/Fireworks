var w;
var h;

function createHill(context){
	w=context.canvas.width;
	h=context.canvas.height;
	context.fillStyle="#000000";
	var points=[];
    var displacement=140;
	var power=Math.pow(2,Math.ceil(Math.log(w)/(Math.log(2))));
	
	points[0] = (h - (h/6))-displacement;
	points[power] = (h - (h/4))-displacement;
	
	for(var i = 1; i<power; i*=2){
		for(var j = (power/i)/2; j <power; j+=power/i){
			points[j] = ((points[j - (power/i)/2] + points[j + (power/i)/2]) / 2) + Math.floor(displacement-56);
		}
		displacement *= 0.9;
	}
	
	context.beginPath();
	for(var i = 0; i<=w; i++){
		if(i === 0){
			context.moveTo(0, points[0]);
		}else if(points[i] !== undefined){
			context.lineTo(i, points[i]);
		}
	}

	context.lineTo(w,h);
	context.lineTo(0,h);
	context.lineTo(0,points[0]);
	context.fill();
}