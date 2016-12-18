
var move=[];
var still=[];
var w;
var h;

function Star(xx,yy){
	this.size=random(2);
	this.speed=random(0.1);
	this.x=xx;
	this.y=yy;
}
Star.prototype.rst=function(){
	this.size=random(2);
	this.speed=random(0.1);
	this.x=w;
	this.y=Math.random()*(h-120);
}
Star.prototype.update=function(ctx){
	this.x-=this.speed;
	if(this.x<0){
		this.rst();
	}else{
		ctx.fillRect(this.x,this.y,this.size,this.size);
	}
}

function ShootingStar(){
	this.rst();
}

ShootingStar.prototype.rst=function(){
	this.x=random(w);
	this.y=0;
	this.len=random(10,90);
	this.speed=random(6,16);
	this.size=random(0.8, 2.0);
	this.waitTime=new Date().getTime()+random(500,3500);
	this.active=false;
}
ShootingStar.prototype.update=function(ctx){
	if(this.active){
		this.x-=this.speed;
		this.y+=this.speed;
		
		if(this.x<0||this.y>=h){
			this.rst();
			
		}else{
			ctx.lineWidth=this.size;
			ctx.beginPath();
			ctx.moveTo(this.x,this.y);
			ctx.lineTo(this.x+this.len,this.y-this.len);
			ctx.stroke();
		}
	}else{
		if(this.waitTime<new Date().getTime()){
			this.active=true;
		}
	}
}


///init stars
function createMeteor(context){  
    w=context.canvas.width;
	h=context.canvas.height; 	
    for(var i=0; i<h; i++){
	    still.push(new Star(Math.random()*w, Math.random()*(h-120)));
        console.log(i+","+still[i].size+","+still[i].speed+","+still[i].x);
    }

    move.push(new ShootingStar());
    move.push(new ShootingStar());
}

function updateMeteor(context){
	w=context.canvas.width;
	h=context.canvas.height;
	//context.fillStyle="#05265c";
   // context.fillRect(0,0,w,h);
	context.fillStyle="#ffffff";
	context.strokeStyle="#ffffff";
	
	var moveLen=move.length;
	while(moveLen--){
		move[moveLen].update(context);
	}
    var stillLen=still.length;
	while(stillLen--){
		still[stillLen].update(context);
	}
	
}

